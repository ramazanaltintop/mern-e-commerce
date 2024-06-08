import Login from "./Login";
import Register from "./Register";
import UserDetails from "./UserDetails";
import React, { useState } from "react";
import UpdateUser from "./UpdateUser";
import "./Auth.css";
import Orders from "./Orders";

const Auth = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [userDetails, setUserDetails] = useState(Object);
  const [isOrderDetail, setIsOrderDetail] = useState(false);

  return (
    <section className="account-page">
      <div className="container">
        <div className="account-wrapper">
          {user ? (
            isOrderDetail ? (
              <Orders email={userDetails.email} />
            ) : (
              <React.Fragment>
                <UserDetails
                  user={user}
                  userDetails={userDetails}
                  setIsOrderDetail={setIsOrderDetail}
                />
                <UpdateUser user={user} setUserDetails={setUserDetails} />
              </React.Fragment>
            )
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
