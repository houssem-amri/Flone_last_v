import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../Banner";
import Modal_delete from "./Modal_delete";
import { useHistory } from "react-router-dom";

export default function Table_conseilleur() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userSelected, setUserSelected] = useState({});
  let history = useHistory();
  
  useEffect(() => {
    getAllUsers();
  }, []);


  const handleClickOpen = (user) => {
    setUserSelected(user)
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
    getAllUsers();
  };


  const getAllUsers = () => {
    axios
      .get("http://localhost:3200/api/get_allUsers")
      .then((result) => {
        console.log(result.data.users);
        setUsers(result.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    <div className="app-main__outer">
      <div className="app-main__inner">
        <Banner title="Table Conseilleur" icon="pe-7s-users" />
        <div className="main-card mb-3 card">
          <div className="card-body">
            <h5 className="card-title">tableau des utilisateurs</h5>
            <div className="row">
              <div className="col-12">
                <table className="mb-0 table">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Prenom</th>
                      <th>Email</th>
                      <th>password</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((value, i) => {
                      if (value.role === "conseilleur") {
                        return (
                          <tr key={i}>
                            <td>{value.nom}</td>
                            <td>{value.prenom}</td>
                            <td>{value.email}</td>
                            <td>{value.password}</td>
                            <td>
                              <button className="mb-2 mr-2 btn-transition btn btn-outline-info" onClick={() => history.push("/Edit_conseilleur/" + value._id)}>
                                <i
                                  className="pe-7s-pen"
                                  style={{ fontSize: 18 }}
                                ></i>
                              </button>
                              <button
                                className="mb-2 mr-2 btn-transition btn btn-outline-danger"
                                onClick={() => handleClickOpen(value)}
                              >
                                <i
                                  className="pe-7s-trash"
                                  style={{ fontSize: 18 }}
                                ></i>
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
                {open ? <Modal_delete data={userSelected} open={open} type="conseilleur" onClose={handleClose} /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}