import React, {createContext, useContext, useState} from "react";
import Cookies from "js-cookie";

// Has to provide default value for authcomplision.
const WebStateContext = createContext({
    authUser: null,
    token: null,
    setAuthUser: () => {},
    manageToken: () => {}
});

// Need to create Context Provider
export const WebContextProvider = ({children}) => {
    const [authUser, setAuthUser] = useState({});
    // const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN_WEB'));
    const [token, setToken] = useState(Cookies.get('ACCESS_TOKEN_WEB'));

    const manageToken = (token) => {
        setToken(token);
        if(token) {
            Cookies.set('ACCESS_TOKEN_WEB', token, { expires: 1 });
            /*localStorage.setItem('ACCESS_TOKEN_WEB', token);*/ }
        else if(!token) {
            // localStorage.removeItem('ACCESS_TOKEN_WEB'); 
            Cookies.remove('ACCESS_TOKEN_WEB'); }
    }

    return (
        <WebStateContext.Provider value={{
            authUser,
            token,
            setAuthUser,
            manageToken
        }}>
            {children}
        </WebStateContext.Provider>
    );
}

export const useWebStateContext = () => useContext(WebStateContext)


