import { useState, useEffect ,createContext } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    return (
        <UserContext.Provider value={{
            userDetails,
            setUserDetails,
            isUserLoggedIn,
            setIsUserLoggedIn
        }}>
            {children}
        </UserContext.Provider>
    );
}