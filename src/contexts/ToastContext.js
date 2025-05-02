import { createContext, useState } from "react";
import MySnackBar from "../components/MySnackBar";

export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ToastContext.Provider value={{ showHideToast }}>
      {children}
      <MySnackBar open={open} message={message} />
    </ToastContext.Provider>
  );
};
