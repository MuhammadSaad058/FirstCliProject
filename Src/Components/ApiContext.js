import React, { createContext, useState, useContext, useCallback } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  const updateUser = useCallback((id, role) => {
    setUserId(id);
    setIsAdmin(role === 'admin');
  }, []);

  const clearUser = useCallback(() => {
    setUserId(null);
    setIsAdmin(null);
  }, []);

  return (
    <ApiContext.Provider value={{ userId, isAdmin, updateUser, clearUser }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => useContext(ApiContext);
