import React from "react";
import UserItemF from "./UserItemF";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

const Users = ({ users, loading }) => {
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="" style={userStyle}>
      {users.map((user) => (
        <UserItemF key={user.id} user={user} />
      ))}
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "2rem",
};

export default Users;
