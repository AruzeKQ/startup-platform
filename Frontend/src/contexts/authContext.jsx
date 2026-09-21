import { createContext, useContext, useState } from "react";

export const userContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);

    return (
        <userContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </userContext.Provider>
    )
}