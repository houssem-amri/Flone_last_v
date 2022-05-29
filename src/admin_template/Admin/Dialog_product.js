import React, { Fragment, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

export default function Dialog_product(props) {
  const { open, onClose } = props;
  const [inputFields, setInputFields] = useState([{ color: "", image: "" }]);

  const handleClose = () => {
    onClose();
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ color: "", image: "", size: [{ name: "", stock: 0 }] });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "color") {
      values[index].color = event.target.value;
    } else if (event.target.name === "image") {
      values[index].image = event.target.value;
    } else if (event.target.name === "name_size") {
    }

    setInputFields(values);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
    >
      <DialogTitle id="alert-dialog-title"></DialogTitle>
      <DialogContent sx={{ minWidth: 860 }}>
        {inputFields.map((inputField, index) => (
          <Fragment key={`${inputField}~${index}`}>
            <div className="form-row">
              <div className="form-group col-sm-5">
                <label htmlFor="Color">Color</label>
                <select
                  name="Color"
                  id="exampleSelect"
                  className="form-control"
                  onChange={(event) => handleInputChange(index, event)}
                  value={inputField.color}
                >
                  <option value={""}>select Color</option>

                  <option value={"white"}>white</option>
                  <option value={"black"}>black</option>
                  <option value={"brown"}>brown</option>
                  <option value={"blue"}>blue</option>
                </select>
              </div>
              <div className="form-group col-sm-5">
                <label htmlFor="lastName">Image </label>
                <input
                  type="file"
                  className="form-control"
                  id="lastName"
                  name="Image"
                  value={inputField.image}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-2">
                <button
                  className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                  type="button"
                  disabled={index === 0}
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </button>
                <button
                  className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                  type="button"
                  onClick={() => handleAddFields()}
                >
                  +
                </button>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-sm-4">
                <label htmlFor="Color">name size</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="name"
                  value={"s"}
                  disabled
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="lastName">stock in this size </label>
                <input
                  type="number"
                  className="form-control"
                  id="lastName"
                  name="stock"
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
            </div>
            <div className="form-row">
              {" "}
              <div className="form-group col-sm-4">
                <label htmlFor="Color">name size</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="name"
                  value={"m"}
                  disabled
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="lastName">stock in this size </label>
                <input
                  type="number"
                  className="form-control"
                  id="lastName"
                  name="stock"
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-sm-4">
                <label htmlFor="Color">name size</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="name"
                  value={"l"}
                  disabled
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="lastName">stock in this size </label>
                <input
                  type="number"
                  className="form-control"
                  id="lastName"
                  name="stock"
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
            </div>
            <div className="form-row">
              {" "}
              <div className="form-group col-sm-4">
                <label htmlFor="Color">name size</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="name"
                  value={"x"}
                  disabled
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="lastName">stock in this size </label>
                <input
                  type="number"
                  className="form-control"
                  id="lastName"
                  name="stock"
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-sm-4">
                <label htmlFor="Color">name size</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="name"
                  value={"xl"}
                  disabled
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="lastName">stock in this size </label>
                <input
                  type="number"
                  className="form-control"
                  id="lastName"
                  name="stock"
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-sm-4">
                <label htmlFor="Color">name size</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="name"
                  value={"xxl"}
                  disabled
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="lastName">stock in this size </label>
                <input
                  type="number"
                  className="form-control"
                  id="lastName"
                  name="stock"
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
            </div>
          </Fragment>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          cancel
        </Button>
        <Button onClick={handleClose} color="success" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
