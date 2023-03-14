import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [searchInfo, setSearchInfo] = useState("");

  useEffect(() => {
    if (!user) {
      const { data } = axios.get("/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ ready, user, setUser,setReady, searchInfo,setSearchInfo }}>
      {children}
    </UserContext.Provider>
  );
}
