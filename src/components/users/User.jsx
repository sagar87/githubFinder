import React, { Component, Fragment } from "react";
import { Spinner } from "../layout/Spinner";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import Repos from "../repos/Repos";

class User extends Component {
  componentDidMount() {
    console.log("here");
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }
  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
  };
  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      company,
      hireable,
    } = this.props.user;
    const { loading } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <Fragment>
        <Link to="/" className="btn btn-light">
          Back to search
        </Link>
        Hireable :{" "}
        {hireable ? (
          <i className="fas fa-check text-success"></i>
        ) : (
          <i className="fas fa-times-circle text-danger"></i>
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              alt=""
              className="round-img"
              style={{ width: "150px" }}
            />
          </div>
          <h1>{name}</h1>
          <p>Location {location}</p>
          <div className="">
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className="btn btn-dark my-1">
              Visit Github
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: </strong> {login}
                  </Fragment>
                )}
              </li>
              <li>
                {login && (
                  <Fragment>
                    <strong>Company: </strong> {company}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers: {followers}</div>
          <div className="badge badge-success">Following: {following}</div>
          <div className="badge badge-light">Public repos: {public_repos}</div>
          <div className="badge badge-dark">Public gists: {public_gists}</div>
        </div>
        <Repos repos={this.props.repos} />
      </Fragment>
    );
  }
}

export default User;
