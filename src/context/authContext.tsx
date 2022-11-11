import { StorageKeys } from "../utils/constants/storage-keys";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  authenticationError: null,
  login: (username: string, password: string) => {},
  logout: () => {},
  validateToken: () => false,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialState.isAuthenticated
  );
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [authenticationError, setAuthenticationError] = useState(
    initialState.authenticationError
  );

  const validateToken = () => {
    const token = localStorage.getItem(StorageKeys.token);
    if (token) {
      const fakeToken = `${process.env.REACT_APP_FAKE_USERNAME}-${process.env.REACT_APP_FAKE_PASSWORD}`;
      if (token === fakeToken) {
        setIsAuthenticated(true);
        return true;
      }
      return false;
    }
    return false;
  };
  const fakeLoginService = (username: string, password: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          username === process.env.REACT_APP_FAKE_USERNAME &&
          password === process.env.REACT_APP_FAKE_PASSWORD
        ) {
          resolve({ token: `${username}-${password}` });
        }
        reject({ message: "Wrong credentials" });
      }, 1000);
    });
  };

  const login = (username: string, password: string) => {
    setIsAuthenticated(false);
    setIsLoading(true);
    setAuthenticationError(null);

    fakeLoginService(username, password)
      .then((response: any) => {
        localStorage.setItem(StorageKeys.token, response.token);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        setAuthenticationError(error);
      })
      .finally(() => {
        navigate("/employees");
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsLoading(false);
    setAuthenticationError(null);
    localStorage.removeItem(StorageKeys.token);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        authenticationError,
        login,
        logout,
        validateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
