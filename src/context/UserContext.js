import React from 'react'

export const User = React.createContext({
    programId: "8B6xv2wbTjUawgV8tvPJwZtVdQ5V1qAXnmGpCbfs688E", 
    info: {},
    setInfo: () => {}
})

export const Provider = ({ children }) => {
    const [info, setInfo] = React.useState({
        "balance": 0, 
        "address": "",
        "transactions": []
    });
  
    return (
      <User.Provider
        value={{
          info,
          setInfo
        }}
      >
        {children}
      </User.Provider>
    );
  };