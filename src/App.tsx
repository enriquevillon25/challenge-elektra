import React, { useContext } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./screens/home/HomeScreen";
import { HeaderComponent } from "./components/header/HeaderComponent";
import { EmployeeScreen } from "./screens/employeeScreen/EmployeeScreen";
import { UpdateScreen } from "./screens/updateScreen/UpdateScreen";
import { AuthContext } from "./context/authContext";

function App() {
  const ProtectedRoute = ({ children }: any) => {
    const { validateToken } = useContext(AuthContext);
    const isValid = validateToken();
    if (!isValid) {
      return <Navigate to="/" />;
    }
    return children;
  };
  const { validateToken } = useContext(AuthContext);
  const isValid = validateToken();
  return (
    <>
      {/* <AuthContextProvider> */}
      <HeaderComponent />
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        <Route path="/" element={<HomeScreen />} />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update"
          element={
            <ProtectedRoute>
              <UpdateScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={isValid ? <EmployeeScreen /> : <HomeScreen />}
        />
      </Routes>
      {/* </AuthContextProvider> */}
    </>
  );
}

export default App;
