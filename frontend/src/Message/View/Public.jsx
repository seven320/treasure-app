import React, { useCallback, useState } from "react";
import MessageClient from "../api";

export default () => {
  const [content, setContent] = useState("");
  const onClick = useCallback(
    _ => {
      MessageClient.getPublicMessage()
        .then(v => setContent(v.message))
        .catch(e => setContent(e));
    },
    []
  );

  return (
    <div>
      <button onClick={onClick}>Get Public Message</button>
      <div>{content}</div>
    </div>
  );
};
