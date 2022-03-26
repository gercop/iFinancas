import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    idgames : props.idgames,
    name    : props.name,
    cost    : props.cost,
    category: props.category,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditGame = () => {
    Axios.put("http://localhost:3001/edit", {
      idgames : editValues.idgames,
      name    : editValues.name,
      cost    : editValues.cost,
      category: editValues.category
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.idgames === editValues.idgames
            ? {
                idgames : editValues.idgames,
                name    : editValues.name,
                cost    : editValues.cost,
                category: editValues.category,
              }
            : value;
        })
      );
    });
    console.log(props.listCard);
    handleClose();    
  };

  const handleDeleteGame = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.idgames}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.idgames !== editValues.idgames;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField disabled  margin="dense" id="idgames"  label="idgames"      defaultValue={props.idgames}  type="text"   fullWidth/>
          <TextField autoFocus margin="dense" id="name"     label="Nome do jogo" defaultValue={props.name}     type="text"   fullWidth onChange={handleChangeValues}/>
          <TextField autoFocus margin="dense" id="cost"     label="preço"        defaultValue={props.cost}     type="number" fullWidth onChange={handleChangeValues}/>
          <TextField autoFocus margin="dense" id="category" label="Categoria"    defaultValue={props.category} type="text"   fullWidth onChange={handleChangeValues}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary"> Cancel </Button>
          <Button color="primary" onClick={() => handleDeleteGame()}> Excluir </Button>
          <Button color="primary" onClick={() => handleEditGame()}>   Salvar  </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}