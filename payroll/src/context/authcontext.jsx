import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const base = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${base}/api/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // The server returns { message, user } on success
        if (response?.data?.user) {
          setUser(response.data.user || null);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('User verification failed:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [base]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;