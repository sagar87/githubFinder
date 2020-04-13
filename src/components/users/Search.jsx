import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    query: "",
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.query === "") {
      this.props.setAlert("Please enter something", "light");
    } else {
      this.props.searchCallback(this.state.query);
      this.setState({ query: "" });
    }
  };
  static propTypes = {
    searchCallback: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };
  render() {
    const { showClear, clearSearch } = this.props;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className="form">
          <input
            value={this.state.query}
            onChange={this.handleChange}
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
  }
}

export default Search;
