import { createContext, useContext, useState } from 'react';
import { User } from '../api/user-callers';

// interface AuthContextValue {
//   user: User | null;
//   login: ({ username, password }: User) => void;
//   logout: () => void;
// }

// const AuthContext = createContext({} as AuthContextValue);

// export const AuthProvider = (props: PropsWithChildren) => {
//   const [user, setUser] = useState<User | null>(null);
//   const login = ({ username, password }: User) => {};

//   const logout = () => {};

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// export default AuthProvider;

import React from 'react';

interface AuthContextType {
  user?: User;
  setUser: (user?: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export default AuthProvider;
