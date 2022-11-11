import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../services/EmployeeService";
export const useEmployee = () => {
  const [employees, setEmployees] = useState([]);

  const listGetAllEmployee = () => {
    getAllEmployees().then((response) => {
      setEmployees(response.data);
      console.log(employees);
    });
  };

  useEffect(() => {
    listGetAllEmployee();
  }, []);

  return { employees };
};
