import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import axios from "axios";

export default function Modal_delete(props) {
  const { open, data,type, onClose } = props;

  const handleClose = () => {
    onClose();
  };


const deleteUser = () => {
  let url = "";
  console.log("heeeere data",data)
  if (type === "conseilleur") {
    
    url = "http://localhost:3200/api/delete_user/" + data._id;
  }
 if (type === "categorie") {
    url = "http://localhost:3200/api/delete_categorie/" + data._id;
  }
  if (type === "produit") {
    url = "http://localhost:3200/api/delete_produit/" + data._id;
  }
  
 
  axios.delete(url).then((result) => {
      console.log(result.data.message);
      handleClose();
    })
    .catch((err) => {
      console.log(err);
    });
};

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
          >
      <DialogTitle id="alert-dialog-title">
       
      </DialogTitle>
      <DialogContent sx={{minWidth:360}}>
        <DialogContentText id="alert-dialog-description">
        Do you really want to delete these records? This process cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">cancel</Button>
        <Button onClick={deleteUser} color="success" autoFocus>
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
  }