import React, { useCallback, useContext, useMemo, useState } from "react";
import UserContext from "../../lib/UserContext";
import MessageClient from "../api";

export default () => {
  const [content, setContent] = useState("");
  const { user } = useContext(UserContext);
  const client = useMemo(() => {
    MessageClient.setUser(user);
    return MessageClient;
  }, [user]);

  const onClick = useCallback(
    _ => {
      client
        .getPrivateMessage()
        .then(v => setContent(v.message))
        .catch(e => setContent(e));
    },
    [client]
  );

  return (
    <div>
      <button onClick={onClick}>Get Private Message</button>
      <div>{content}</div>
    </div>
  );
};
