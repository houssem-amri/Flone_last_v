import axios from "axios";
import React, { useEffect, useState } from "react";
import Banner from "../Banner";
import { useHistory } from "react-router-dom";

export default function Table_Payment() {
  const [Payment, setPayment] = useState([]);

  useEffect(() => {
    getAllPayment();
  }, []);



  const getAllPayment = () => {
    axios
      .get("http://localhost:3200/api/get_payment")
      .then((result) => {
        setPayment(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="app-main__outer">
      <div className="app-main__inner">
        <Banner title="Tableau payment" icon="pe-7s-cart" />
        <div className="main-card mb-3 card">
          <div className="card-body">
            <h5 className="card-title">tableau de Payment</h5>
            <div className="row">
              <div className="col-12">
                <table
                  style={{ width: "100%" }}
                  id="example"
                  className="table table-hover table-striped table-bPaymented"
                >
                  <thead>
                    <tr>
                      <th>Nom d'utilisateur</th>
                      <th>téléphone de l'utilisateur</th>
                      <th>type de carte</th>
                      <th>pays de la carte</th>
                      <th>mois d'expiration</th>
                      <th>année d'expiration</th>
                    </tr>
                  </thead>
                  <tbody style={{ maxHeight: "80%" }}>
                    {Payment.map((value, i) => (
                      <tr key={i}>

                        <td>{value.user_id.nom}{" "}{value.user_id.prenom} </td>
                        <td>{value.user_id.tel} </td>
                        <td>{value.card_details.brand}</td>
                        <td>{value.card_details.country}</td>
                        <td>{value.card_details.exp_month}</td>
                        <td>{value.card_details.exp_year}</td>



                      </tr>
                    ))}
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
