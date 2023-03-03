import React, { createContext, useState } from "react";

const UserContext = createContext()

function UserContextProvider({children}) {
    const [userId, setUserId] = useState(null)

    return <UserContext.Provider value={{userId, setUserId}}>
            {children}
        </UserContext.Provider>
}

export {UserContextProvider, UserContext}