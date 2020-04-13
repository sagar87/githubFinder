import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ showClear, clearSearch, searchCallback, setAlert }) => {
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
      searchCallback(query);
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
      {showClear && (
        <button className="btn btn-light btn-block" onClick={clearSearch}>
          Clear
        </button>
      )}
    </React.Fragment>
  );
};

Search.propTypes = {
  searchCallback: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
