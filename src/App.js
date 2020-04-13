import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBarF from "./components/layout/NavBarF";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };
  async componentDidMount() {
    this.setState({ loading: true });
    const { data } = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ loading: false, users: data });
  }
  searchUsers = async (query) => {
    this.setState({ loading: true });
    const { data } = await axios.get(
      `https://api.github.com/search/users?q=${query}`
    );

    this.setState({ loading: false, users: data.items }, () => {
      console.log(this.state);
    });
  };

  getUser = async (username) => {
    this.setState({ loading: true });
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`
    );

    this.setState({ loading: false, user: data }, () => {
      console.log(this.state);
    });
  };

  getUserRepos = async (username) => {
    console.log("calling");
    this.setState({ loading: true });
    const { data } = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );

    this.setState({ loading: false, repos: data }, () => {
      console.log(this.state);
    });
  };
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };
  setAlert = (message, type) => {
    this.setState({ alert: { message, type } });
    setTimeout(() => this.setState({ alert: null }), 2000);
  };
  render() {
    return (
      <Router>
        <div className="App">
          <NavBarF />

          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      showClear={this.state.users.length > 0 ? true : false}
                      searchCallback={this.searchUsers}
                      clearSearch={this.clearUsers}
                      setAlert={this.setAlert}
                    />
                    <Users
                      users={this.state.users}
                      loading={this.state.loading}
                    />
                  </Fragment>
                )}
              />
              <Route exact path="/about" render={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    loading={this.state.loading}
                    getUserRepos={this.getUserRepos}
                    repos={this.state.repos}
                    user={this.state.user}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
