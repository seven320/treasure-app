import React, { useMemo } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Header from "./Layout/Header";
import { useFirebase } from "./lib/hooks";
import UserContext from "./lib/UserContext";
import { MessagePrivate, MessagePublic } from "./Message/View";

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
      <HashRouter>
        <Switch>
          <Route path={"/public"} component={MessagePublic} />
          <Route path={"/private"} component={MessagePrivate} />
        </Switch>
      </HashRouter>
    </UserContext.Provider>
  );
};
