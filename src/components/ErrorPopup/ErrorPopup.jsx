import CloseIcon from "@mui/icons-material/Close";
import { Box, Alert, IconButton, Collapse } from "@mui/material";
import { useErrorActionsDispatch } from "../../common/hooks/useActions";

const ErrorPopup = ({ error, open }) => {
  const { removeError } = useErrorActionsDispatch();
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                removeError();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ backgroundColor: "rgb(253, 237, 237) !important" }}
        >
          {error}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default ErrorPopup;
