import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AuthRouteGuard = () => {
  const user = useSelector((state) => state.user.value.loggedInUser);
  if (user.userId) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default AuthRouteGuard;
