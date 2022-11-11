import axios from "axios";

// export function EmployeeService() {
export const getAllEmployees = () => {
  return axios
    .get(
      "https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/:tu_nombre"
    )
    .then((response) => {
      const { data } = response;
      return data;
    });
};
// }
