import React, { useContext } from "react";
import UserContext from "../lib/UserContext";
import "./header.scss";

export default ({ login, logout }) => {
  const { user } = useContext(UserContext);
  return (
    <header className="header">
      {user === null ? (
        <button onClick={login}>ログイン</button>
      ) : (
        <button onClick={logout}>ログアウト</button>
      )}
    </header>
  );
};
