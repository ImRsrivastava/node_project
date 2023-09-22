import Cookies from "js-cookie";
import React, {createContext, useContext, useState} from "react";

// Has to provide default value for authcomplision.
const AdminStateContext = createContext({
    authUser: null,
    token: null,
    setAuthUser: () => {},
    manageToken: () => {}
});

// Need to create Context Provider
export const AdminContextProvider = ({children}) => {
    const [authUser, setAuthUser] = useState({});
    // const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN_ADMIN'));
    const [token, setToken] = useState(Cookies.get('ACCESS_TOKEN_ADMIN'));

    const manageToken = (token) => {
        setToken(token);
        if(token) {
            // localStorage.setItem('ACCESS_TOKEN_ADMIN', token);
            Cookies.set('ACCESS_TOKEN_ADMIN', token, { expires: 1 }); }

        else if(!token) {
            // localStorage.removeItem('ACCESS_TOKEN_ADMIN');
            Cookies.remove('ACCESS_TOKEN_ADMIN'); }
    }

    return (
        <AdminStateContext.Provider value={{
            authUser,
            token,
            setAuthUser,
            manageToken
        }}>
            {children}
        </AdminStateContext.Provider>
    );
}

export const useAdminStateContext = () => useContext(AdminStateContext)


