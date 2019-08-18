import React, { useCallback, useContext, useEffect, useState } from "react";
import UserContext from "../../lib/UserContext";
import ArticleClient from "../api";
import { BodyForm, TitleForm } from "./Components";

export default ({ history }) => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    ArticleClient.setUser(user);
  }, [user]);

  const handleSubmit = useCallback(
    ev => {
      ev.preventDefault();
      ArticleClient.createArticle(title, body)
        .then(v => history.push(`/articles/${v.id}`))
        .catch(e => {
          // Todo: error handling
        });
    },
    [title, body]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TitleForm value={title} onChange={setTitle} />
        <br />
        <BodyForm value={body} onChange={setBody} />
        <br />
        <input type="submit" value="投稿する" />
      </form>
    </div>
  );
};
