import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { User } from '../api/user-callers';

interface AuthContextValue {
  users: User[];
  login: ({ username, password }: User) => void;
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextValue);

export const AuthProvider = (props: PropsWithChildren) => {
  const [users, setUsers] = useState<User[]>([]);

  const login = ({ username, password }: User) => {
    setUser({ username, password });
  };

  const logout = () => {
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ users, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
