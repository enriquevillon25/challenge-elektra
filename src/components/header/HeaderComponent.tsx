import React, { useContext } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import "./HeaderComponent.styles.css";
import { AuthContext } from "../../context/authContext";
export const HeaderComponent = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
            Grupo Salinas
          </Link>
        </Typography>
        {!isAuthenticated && (
          <Button color="inherit">
            <Link
              to="/"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Login
            </Link>
          </Button>
        )}
        {isAuthenticated && (
          <>
            <Button color="inherit">
              <Link
                to="/employees"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                Employees
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                to="/update"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                Update
              </Link>
            </Button>
            <Button onClick={logout} color="inherit">
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
