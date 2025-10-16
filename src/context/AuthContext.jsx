import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("focusFlowUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("focusFlowUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("focusFlowUser");
    }
  }, [user]);

  function signup(email, password) {
    const users = JSON.parse(localStorage.getItem("focusFlowUsers") || "{}");
    if (users[email]) throw new Error("User already exists");
    users[email] = { email, password };
    localStorage.setItem("focusFlowUsers", JSON.stringify(users));
    setUser({ email });
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem("focusFlowUsers") || "{}");
    if (!users[email] || users[email].password !== password) {
      throw new Error("Invalid email or password");
    }
    setUser({ email });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
