import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useAllUsersData = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("Auth context must be used within a AuthProvider");
  }
  return context;
};

export { UserProvider, UserContext, useAllUsersData };
