import React from 'react'

export const User = React.createContext({
    programId: "8B6xv2wbTjUawgV8tvPJwZtVdQ5V1qAXnmGpCbfs688E", 
    info: {
        "balance": "2000", 
        "address": "fksdfmdsalfmdsfl;dsfklmds",
        "transactionHistory": [
            {
                id: 'lsdmkfds', 
                slot:  'dslfmkdsmf'
            }, 
            {
                id: 'sklgmsdm', 
                slot: '100'
            }
        ]
    },
    addInfo: () => {}, 
    addTransaction: () => {},
})

export const Provider = ({ children }) => {
    const [info, setInfo] = React.useState({
        "balance": "2000", 
        "address": "fksdfmdsalfmdsfl;dsfklmds",
        "transactionHistory": [
            {
                id: 'lsdmkfds', 
                slot:  'dslfmkdsmf'
            }, 
            {
                id: 'sklgmsdm', 
                slot: '100'
            }
        ]
    },);
  
    const addInfo = (data) => setInfo({...info, ...data});
    const addTransaction = (data) => setInfo({...info, ...data }); // data is of object type 
  
    return (
      <User.Provider
        value={{
          info,
          addInfo,
          addTransaction
        }}
      >
        {children}
      </User.Provider>
    );
  };