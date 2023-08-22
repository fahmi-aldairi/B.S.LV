/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;
        console.log(role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
