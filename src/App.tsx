import React, { useContext, useEffect } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./screens/home/HomeScreen";
import { HeaderComponent } from "./components/header/HeaderComponent";
import { EmployeeScreen } from "./screens/employeeScreen/EmployeeScreen";
import { UpdateScreen } from "./screens/updateScreen/UpdateScreen";
import { AuthContext } from "./context/authContext";

function App() {
  const { isAuthenticated, validateToken } = useContext(AuthContext);

  useEffect(() => {
    validateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ProtectedRoute = ({ children }: any) => {
    const { isAuthenticated } = useContext(AuthContext);
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <>
      {/* <AuthContextProvider> */}
      <HeaderComponent />
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        <Route
          path="/"
          element={isAuthenticated ? <EmployeeScreen /> : <HomeScreen />}
        />
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
          element={isAuthenticated ? <EmployeeScreen /> : <HomeScreen />}
        />
      </Routes>
      {/* </AuthContextProvider> */}
    </>
  );
}

export default App;
