import { Button, Grid } from "@mui/material";

const AuthButton = ({ buttonText }) => {
  return (
    <Grid item>
      <Button variant="contained" type="submit" className="button-block">
        {buttonText}
      </Button>
    </Grid>
  );
};

export default AuthButton;
