import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const AlertDialog = ({
  open,
  setOpen,
  dialogTitle,
  children,
  confirmAction,
  confirmActionLabel,
  discardActionLabel,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{discardActionLabel || "Cancel"}</Button>
        <Button variant="contained" onClick={confirmAction} autoFocus>
          {confirmActionLabel || "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
