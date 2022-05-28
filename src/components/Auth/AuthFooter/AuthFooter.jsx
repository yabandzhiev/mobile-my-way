import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

const AuthFooter = ({ isSignIn }) => {
  return (
    <>
      {isSignIn ? (
        <>
          <Grid item className="links">
            <Link to="/register">Dont have an account?</Link>
          </Grid>
          <Grid item className="links">
            <Link to="/">Continue to catalog</Link>
          </Grid>
          <Grid item className="logo">
            <img src="/carLogo.png" alt="logo" />
            <br />
            <span>Copyright © Mobile{new Date().getFullYear()}</span>
          </Grid>
        </>
      ) : (
        <>
          <Grid item className="links">
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </Grid>
          <Grid item className="logo">
            <span>Copyright © Mobile{new Date().getFullYear()}</span>
          </Grid>
        </>
      )}
    </>
  );
};

export default AuthFooter;
