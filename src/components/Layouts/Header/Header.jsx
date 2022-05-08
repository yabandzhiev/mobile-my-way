import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../store/user/userSlice";

import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.value.loggedInUser);

  const handleLoginPage = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <>
      <div className="header">
        <img src="/carLogo.png" alt="logo" className="logo" />

        {Object.keys(isLoggedIn).length > 0 ? (
          <span className="authButton" onClick={handleLogout}>
            Logout, {isLoggedIn.firstName} {isLoggedIn.lastName}
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
