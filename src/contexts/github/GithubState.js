import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async (query) => {
    setLoading();
    const { data } = await axios.get(
      `https://api.github.com/search/users?q=${query}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: data.items,
    });
  };
  // Get User
  const getUser = async (username) => {
    setLoading();
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`
    );
    dispatch({
      type: GET_USER,
      payload: data,
    });
  };

  // Get Repos

  const getUserRepos = async (username) => {
    console.log("salas");
    setLoading();
    const { data } = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );

    dispatch({
      type: GET_REPOS,
      payload: data,
    });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });
  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        getUser,
        searchUsers,
        clearUsers,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
