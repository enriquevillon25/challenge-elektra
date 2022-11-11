import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import "./HomeScreen.styles.css";
import { AuthContext } from "../../context/authContext";

export const HomeScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, authenticationError, login } =
    useContext(AuthContext);

  const handleBlock = (e: any) => {
    e.preventDefault();
  };
  const handleLogin = () => {
    login(username, password);
  };
  return (
    <>
      <form className="container__form">
        <TextField
          id="outlined-basic"
          label="User"
          variant="outlined"
          color="primary"
          required
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          onCut={handleBlock}
          onCopy={handleBlock}
          onPaste={handleBlock}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          color="primary"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onCut={handleBlock}
          onCopy={handleBlock}
          onPaste={handleBlock}
        />
        <div>
          {authenticationError && (
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ flexGrow: 1, color: "red" }}
            >
              Usuario o Contraseña incorrectos
            </Typography>
          )}
          <Button
            onClick={handleLogin}
            variant="contained"
            endIcon={<SendIcon />}
          >
            {isLoading ? "Loading" : "Log In"}
          </Button>
        </div>
      </form>
    </>
  );
};
