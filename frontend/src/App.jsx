import React from "react";
import firebase from "./firebase";
import { getPrivateMessage, getPublicMessage } from "./api";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      message: "",
      errorMessage: ""
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({
          user: null
        });
      }
    });
  }

  getPrivateMessage() {
    this.state.user
      .getIdToken()
      .then(token => {
        return getPrivateMessage(token);
      })
      .then(resp => {
        this.setState({
          message: resp.message
        });
      })
      .catch(error => {
        this.setState({
          errorMessage: error.toString()
        });
      });
  }

  render() {
    if (this.state.user === null) {
      return <button onClick={firebase.login}>Please login</button>;
    }
    return (
      <div>
        <div>{this.state.message}</div>
        <p style={{ color: "red" }}>{this.state.errorMessage}</p>
        <button onClick={this.getPrivateMessage.bind(this)}>
          Get Private Message
        </button>
        <button onClick={firebase.logout}>Logout</button>
      </div>
    );
  }
}

export default App;
