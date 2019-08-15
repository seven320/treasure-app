import React, { useMemo } from "react";
import Header from "./Layout/Header";
import { useFirebase } from "./lib/hooks";
import UserContext from "./lib/UserContext";

export default () => {
  const { user, login, logout } = useFirebase();
  const userObject = useMemo(() => {
    if (user === null) {
      return null;
    } else {
      return {
        getToken: () => user.getIdToken()
      };
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user: userObject }}>
      <Header {...{ login, logout }} />
    </UserContext.Provider>
  );
};
