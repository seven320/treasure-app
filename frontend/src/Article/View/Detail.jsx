import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../lib/UserContext";
import ArticleClient from "../api";

export default ({ match, history }) => {
  const articleId = match.params.articleId;
  const { user } = useContext(UserContext);
  const [article, setArticle] = useState(undefined);
  const [error, setError] = useState("");
  const onDeleteClicked = useCallback(
    _ => {
      ArticleClient.deleteArticle(articleId)
        .then(v => history.replace("/"))
        .catch(e => setError(e));
    },
    [articleId]
  );

  useEffect(() => {
    ArticleClient.fetchArticle(articleId)
      .then(v => setArticle(v))
      .catch(e => setError(e));
  }, [articleId]);
  useEffect(() => {
    ArticleClient.setUser(user);
  }, [user]);

  if (article === undefined) {
    return <div>Now Loading</div>;
  }

  return (
    <div>
      <ArticleRender article={article} />
      <button>
        <Link to={`/articles/${articleId}/edit`}>編集</Link>
      </button>
      <button onClick={onDeleteClicked}>削除</button>
      <p>{error}</p>
    </div>
  );
};

const ArticleRender = ({ article }) => (
  <div>
    <p>{article.title}</p>
    <div style={{ border: "solid 1px" }}>{article.body}</div>
  </div>
);
