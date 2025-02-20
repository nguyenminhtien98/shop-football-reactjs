import { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover={false}
                draggable
                theme="colored"
            />
        </ToastContext.Provider>
    );
};