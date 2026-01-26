import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fetchUserDetails } from '../api/auth/cognito';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUserDetails = async () => {
    const result = await fetchUserDetails();
    if (result.success) {
      setUserData(result.data);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          await loadUserDetails();
        }
      } catch (e) {
        console.error('Failed to load token', e);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const login = async (newToken) => {
    await AsyncStorage.setItem('token', newToken);
    setToken(newToken);
    await loadUserDetails();
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!token, userData, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
