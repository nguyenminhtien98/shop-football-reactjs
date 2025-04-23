import { createContext, useState, useContext } from 'react';

const AdminPageContext = createContext();

export const AdminPageProvider = ({ children }) => {
    const [showAdminPage, setShowAdminPage] = useState(false);

    return (
        <AdminPageContext.Provider value={{ showAdminPage, setShowAdminPage }}>
            {children}
        </AdminPageContext.Provider>
    );
};

export const useAdminPage = () => useContext(AdminPageContext);
