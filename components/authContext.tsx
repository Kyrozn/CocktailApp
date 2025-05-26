import React, { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  name: string;
  setName: (name: string) => void;
  Sname: string;
  setSName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  agreed: boolean;
  setAgreed: (agreed: boolean) => void;
  isLoginForm: boolean;
  setStateForm: (v: boolean) => void;
  stayConnected: boolean;
  setStayConnected: (stay: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");
  const [Sname, setSName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [stayConnected, setStayConnected] = useState(false);
  const [isLoginForm, setStateForm] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        name,
        setName,
        Sname,
        setSName,
        email,
        setEmail,
        password,
        setPassword,
        agreed,
        setAgreed,
        isLoginForm,
        setStateForm,
        stayConnected,
        setStayConnected,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
