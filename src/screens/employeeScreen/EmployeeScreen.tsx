import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Employee } from "../../interfaces/Employee";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { EmployeeAxiosClient } from "../../config/EmployeeAxiosClient";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "name",
    headerName: "First name",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "last_name",
    headerName: "Last name",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "birthday",
    headerName: "Birthday",
    width: 200,
    align: "center",
    headerAlign: "center",
  },
];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const EmployeeScreen = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [employeSearch, setEmployeSearch] = useState<string>("");
  const [newEmployeeName, setNewEmployeeName] = useState<string>("");
  const [newEmployeeLastName, setNewEmployeeLastName] = useState<string>("");
  const [newEmployeeBirthday, setNewEmployeeBirthday] = useState<string>("");

  const convertTimeToDate = (timeStamp: number) => {
    const date = new Date(timeStamp);
    return (
      date.getDate() +
      1 +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear()
    );
  };

  const convertDateToTime = (date: string) => {
    return new Date(date).getTime();
  };

  const listEmployees = () => {
    EmployeeAxiosClient.get("v1/examen/employees/Enrique").then((response) => {
      const { data } = response;
      const employeesFormat = data.data.employees.map((employee: Employee) => {
        return {
          id: employee.id,
          name: employee.name,
          last_name: employee.last_name,
          birthday: convertTimeToDate(employee.birthday),
        };
      });
      setEmployees(employeesFormat);
      return data;
    });
  };
  useEffect(() => {
    listEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const employeesRender = () =>
    employees.filter((employee: Employee) => {
      return (
        employee.name.toUpperCase().includes(employeSearch) ||
        employee.last_name.toUpperCase().includes(employeSearch)
      );
    });

  const handleSubmit = () => {
    EmployeeAxiosClient.post("v1/examen/employees/Enrique", {
      name: newEmployeeName,
      last_name: newEmployeeLastName,
      birthday: convertDateToTime(newEmployeeBirthday),
    }).then((response) => {
      if (response) {
        setNewEmployeeBirthday("");
        setNewEmployeeLastName("");
        setNewEmployeeName("");
        listEmployees();
      }
    });
  };

  return (
    <div className="flex col gap-md">
      <div
        style={{
          margin: "1%",
        }}
        className="flex justify-end"
      >
        <Button
          variant="outlined"
          className="flex gap-xsm"
          onClick={handleOpen}
        >
          <span> Add Employee</span>
          <PersonAddAlt1Icon />
        </Button>
      </div>
      <div className="flex justify-center">
        <TextField
          id="outlined-basic"
          label="Search a employee"
          variant="outlined"
          color="primary"
          onChange={(e: any) => {
            setEmployeSearch(e.target.value.toUpperCase());
          }}
          value={employeSearch}
        />
      </div>
      <div
        style={{
          height: 500,
        }}
        className="flex justify-center align-center"
      >
        <div className="w-50 h-100">
          {employees && (
            <DataGrid
              rows={employeesRender()}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          )}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
            sx={{ margin: "0 0 4% 0" }}
          >
            Add a new employee
          </Typography>
          <form className="flex col gap-sm" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              required
              type="text"
              inputProps={{
                maxLength: 30,
                minLength: 3,
              }}
              value={newEmployeeName}
              onChange={(e) => {
                setNewEmployeeName(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              type="text"
              variant="outlined"
              required
              inputProps={{
                maxLength: 30,
                minLength: 3,
              }}
              value={newEmployeeLastName}
              onChange={(e) => {
                setNewEmployeeLastName(e.target.value);
              }}
            />
            <TextField
              id="date"
              label="Birthday"
              type="date"
              required
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setNewEmployeeBirthday(e.target.value);
              }}
              value={newEmployeeBirthday}
            />
            <div className="flex justify-start">
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                type="submit"
                disabled={
                  !newEmployeeName ||
                  newEmployeeName.length < 3 ||
                  !newEmployeeLastName ||
                  newEmployeeLastName.length < 3 ||
                  !newEmployeeBirthday
                }
              >
                Add
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
