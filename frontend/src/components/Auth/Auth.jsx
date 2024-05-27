import Login from "./Login";
import Register from "./Register";
import UserDetails from "./UserDetails";
import React, { useState } from "react";
import UpdateUser from "./UpdateUser";
import "./Auth.css";

const Auth = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [userDetails, setUserDetails] = useState(Object);

  return (
    <section className="account-page">
      <div className="container">
        <div className="account-wrapper">
          {user ? (
            <React.Fragment>
              <UserDetails user={user} userDetails={userDetails} />
              <UpdateUser user={user} setUserDetails={setUserDetails} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Login /> <Register />
            </React.Fragment>
          )}
        </div>
      </div>
    </section>
  );
};

export default Auth;
