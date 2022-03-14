import { Close } from "@mui/icons-material";
import {
  Button,
  DialogTitle,
  useMediaQuery,
  DialogActions,
  DialogContent,
  Dialog as MuiDialog,
  IconButton,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Dialog = ({
  open,
  setOpen,
  dialogTitle,
  confirmActionLabel,
  confirmAction,
  discardActionLabel,
  children,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MuiDialog
        open={open}
        fullScreen={fullScreen}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="dialog-custom-header flex justify-between items-center pr-4">
          <DialogTitle id="responsive-dialog-title">{dialogTitle}</DialogTitle>
          {!fullScreen && (
            <div className="">
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </div>
          )}
        </div>
        <Divider className="" />

        <DialogContent>{children}</DialogContent>
        <DialogActions className="mt-3">
          <Button onClick={handleClose}>
            {discardActionLabel || "Cancel"}
          </Button>
          <Button variant="contained" onClick={confirmAction}>
            {confirmActionLabel || "Confirm"}
          </Button>
        </DialogActions>
      </MuiDialog>
    </div>
  );
};

export default Dialog;
