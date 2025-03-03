import React, { createContext, useState } from 'react';

export const YourContext = createContext();

export const YourProvider = ({ children }) => {
  const [depotData, setDepotData] = useState([]);

  return (
    <YourContext.Provider value={{ depotData, setDepotData }}>
      {children}
    </YourContext.Provider>
  );
}; 