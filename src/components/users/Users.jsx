import React, { useContext } from "react";
import UserItemF from "./UserItemF";
import Spinner from "../layout/Spinner";

import GithubContext from "../../contexts/github/githubContext";

const Users = () => {
  const githubContext = useContext(GithubContext);

  const { loading, users } = githubContext;
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

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "2rem",
};

export default Users;
