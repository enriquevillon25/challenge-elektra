import { createContext, useContext, useState } from "react";

const defaultValue = {
  isAuthenticated: true,
  login: () => {},
  logout: () => {},
};
const AuthContext = createContext(defaultValue);

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    setIsAuthenticated(true);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
