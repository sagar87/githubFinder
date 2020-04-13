import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import GithubContext from "../../contexts/github/githubContext";

const Search = ({ showClear, clearSearch, setAlert }) => {
  const githubContext = useContext(GithubContext);
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query === "") {
      setAlert("Please enter something", "light");
    } else {
      console.log("SEARCH: CALLING");
      githubContext.searchUsers(query);
      setQuery("");
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="form">
        <input
          value={query}
          onChange={handleChange}
          type="text"
          name="query"
          placeholder="Search Users ..."
        />
        <input type="submit" className="btn btn-dark btn-block" />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </React.Fragment>
  );
};

Search.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default Search;
