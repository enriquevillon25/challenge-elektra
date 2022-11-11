import React, { useEffect, useState } from "react";
import { EmployeeAxiosClient } from "../config/EmployeeAxiosClient";
import { Employee } from "../interfaces/Employee";
import { convertTimeToDate } from "../utils/convertTimeToDate";
export const useEmployee = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const getAllEmployees = () => {
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
    });
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  return { employees, getAllEmployees };
};
