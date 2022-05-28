import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  useAuthActionsDispatch,
  useErrorActionsDispatch,
} from "../../../common/hooks/useActions";

import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const { removeError } = useErrorActionsDispatch();
  const { logoutUser } = useAuthActionsDispatch();

  const user = useSelector((state) => state.user.value.loggedInUser);
  const isUserLoggedIn = Object.keys(user).length > 0;

  const handleLoginPage = () => {
    removeError();
    navigate("/login");
  };
  const handleLogout = () => {
    logoutUser();
  };
  return (
    <>
      <div className="header">
        <img src="/carLogo.png" alt="logo" className="logo" />

        {isUserLoggedIn ? (
          <span className="authButton" onClick={handleLogout}>
            Logout, {user.firstName} {user.lastName}
          </span>
        ) : (
          <span className="authButton" onClick={handleLoginPage}>
            LOGIN
          </span>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Header;
