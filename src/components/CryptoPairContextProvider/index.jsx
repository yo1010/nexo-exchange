import React, { createContext, useContext, useState } from 'react';

const Context = createContext({});

export const useCryptoPairContext = () => {
    const context = useContext(Context);
  
    if (context === undefined) {
      throw new Error(
        "useCustomizationsState must be used within a ContextProvider"
      );
    }
  
    return context;
};

const CryptoPairContextProvider = ({ children }) => {
    const [cryptoPair, setCryptoPair] = useState("");

    return (
        <Context.Provider value={[cryptoPair, setCryptoPair]}>
            {children}
        </Context.Provider>
    );
};

export default CryptoPairContextProvider;
