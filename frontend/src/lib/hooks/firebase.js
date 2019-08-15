import { useEffect, useState } from "react";
import firebase from "../../firebase";

export default () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    login: () => firebase.login(),
    logout: () => firebase.logout()
  };
};
