import { createContext, useContext, useState, type ReactNode } from 'react';
import { mockUser } from '../mockData';
import type { User } from '../types';

interface AuthContextData {
  user: User | null;
  login: () => void;
  logout: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const login = () => {
    setUser(mockUser);
    setIsLoginModalOpen(false); // Já fecha o modal automaticamente ao logar
  };
  
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoginModalOpen, setIsLoginModalOpen }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}