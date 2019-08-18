import React, { useCallback, useContext, useEffect, useState } from "react";
import UserContext from "../../lib/UserContext";
import ArticleClient from "../api";
import { BodyForm, TitleForm } from "./Components";

export default ({ history, match }) => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [initialized, setInitialized] = useState(false);
  const articleId = match.params.articleId;

  useEffect(() => {
    ArticleClient.setUser(user);
  }, [user]);

  useEffect(() => {
    ArticleClient.fetchArticle(articleId)
      .then(v => {
        setTitle(v.title);
        setBody(v.body);
        setInitialized(true);
      })
      .catch(e => {
        // Todo: Error handling
      });
  }, [articleId]);

  const handleSubmit = useCallback(
    ev => {
      ev.preventDefault();
      ArticleClient.updateArticle(articleId, title, body)
        .then(_ => {
          history.replace(`/articles/${articleId}`);
        })
        .catch(e => {
          // Todo: Error handling
        });
    },
    [title, body]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TitleForm disabled={!initialized} value={title} onChange={setTitle} />
        <br />
        <BodyForm disabled={!initialized} value={body} onChange={setBody} />
        <br />
        <input type="submit" value="保存する" />
      </form>
    </div>
  );
};
