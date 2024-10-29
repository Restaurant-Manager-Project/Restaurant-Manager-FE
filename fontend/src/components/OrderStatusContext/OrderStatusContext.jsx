import React, { createContext, useState, useContext } from 'react';

const OrderStatusContext = createContext();

export const OrderStatusProvider = ({ children }) => {
  const [hasOrderData, setHasOrderData] = useState(false);

  return (
    <OrderStatusContext.Provider value={{ hasOrderData, setHasOrderData }}>
      {children}
    </OrderStatusContext.Provider>
  );
};

export const useOrderStatus = () => useContext(OrderStatusContext);