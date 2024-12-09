import React, { createContext, useState, useContext } from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transacoes, setTransacoes] = useState([]);

  const addTransaction = newTransaction => {
    setTransacoes(prevTransacoes => [...prevTransacoes, newTransaction]);
  };

  return (
    <TransactionContext.Provider
      value={{ transacoes, setTransacoes, addTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  return useContext(TransactionContext);
};
