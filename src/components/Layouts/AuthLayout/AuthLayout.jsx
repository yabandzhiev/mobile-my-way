import React from "react";
import "./AuthLayout.scss";

import { Outlet } from "react-router-dom";
import { Grid, Paper } from "@mui/material";

const AuthLayout = () => {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        className="backgroundImage"
        sx={{ backgroundImage: "url(/backgroundImage.jpg)" }}
      >
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            spacing={2}
            className="form"
          >
            <Paper elevation={2} className="paper-background">
              <Grid container direction="column" spacing={3}>
                <Outlet />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default AuthLayout;
