import React, { createContext, useContext, useState, useEffect } from "react";
import { type User } from "../types";
import { api } from "../services/api";

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  usersList: User[];
  refreshUsers: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>([]);

  const refreshUsers = async () => {
    try {
      const res = await api.getUsers();
      setUsersList(res.data);
      // Auto-seleciona o primeiro se não tiver ninguém logado
      if (!currentUser && res.data.length > 0) {
        setCurrentUser(res.data[0]);
      }
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
    }
  };

  useEffect(() => {
    (async () => {
      await refreshUsers();
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, usersList, refreshUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
