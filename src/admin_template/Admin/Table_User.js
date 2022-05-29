import axios from "axios";
import React, { useEffect, useState } from "react";
import Banner from "../Banner";

export default function Table_product() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

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
        <Banner title="Tableau Client" icon="pe-7s-users" />
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
                    
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((value, i) => {
                      if (value.role === "client") {
                        return (
                          <tr key={i}>
                            <td>{value.nom}</td>
                            <td>{value.prenom}</td>
                            <td>{value.email}</td>
                            
                            <td>
                          
                             
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}