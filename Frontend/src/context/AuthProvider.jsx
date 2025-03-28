import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const initialUser = (() => {
    const storedUser = localStorage.getItem('UsersBlog');
    if (storedUser && storedUser !== "undefined") {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
        return null;
      }
    }
    return null;
  })();

  const [currentUser, setCurrentUser] = useState(initialUser);
  
  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('UsersBlog', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('UsersBlog');
  };

  const updateProfile = (updatedUser) => {
    setCurrentUser((prevUser) => {
      if (JSON.stringify(prevUser) === JSON.stringify(updatedUser)) {
        return prevUser;
      }
      localStorage.setItem("UsersBlog", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const value = {
    updateProfile,
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};