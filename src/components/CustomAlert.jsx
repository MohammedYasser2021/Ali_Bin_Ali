import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const CustomAlert = ({ open, onClose, message, onConfirm, type }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Notification</DialogTitle>
      <DialogContent
        className={`${type === "success" ? "text-green-500" : "text-red-500"}`}
      >
        {message}
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CustomAlert;
