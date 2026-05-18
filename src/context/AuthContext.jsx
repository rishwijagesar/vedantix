import { createContext, useContext, useEffect, useState } from 'react';
import authApi from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authApi
      .me()
      .then((result) => setUser(result?.user || null))
      .finally(() => setLoading(false));
  }, []);

  const value = {
    loading,
    user,
    isAuthenticated: !!user,
    logout: authApi.logout,
    login: authApi.login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
