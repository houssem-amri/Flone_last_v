import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Banner from "../Banner";

export default function Edit_conseilleur() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "conseilleur";

  let param = useParams();
  let history = useHistory();

  useEffect(() => {
    getConseilleurById();
  }, []);
  
  const ChangeNom = (event) => {
    setNom(event.target.value);
  };
  const ChangePrenom = (event) => {
    setPrenom(event.target.value);
  };
  const ChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const ChangePassword = (event) => {
    setPassword(event.target.value);
  };
 
  const getConseilleurById = () => {
    axios
      .get("http://localhost:3200/api/get_conseilleur_byId/" + param.id)
      .then((result) => {

        let data = result.data.user;

        setNom(data.nom);
        setPrenom(data.prenom);
        setEmail(data.email);
        setPassword(data.password);
      })
      .catch((err) => {
        console.log(err);
      });

  };
  const HandleSubmit = () => {
    let data = {
      _id: param.id,
      nom: nom,
      prenom: prenom,
      email: email,
      password: password,
      role: role,
    };
    console.log("here response", data);
    axios
      .put("http://localhost:3200/api/Update_conseilleur", data)
      .then((response) => {
        console.log("here response", response.data.message);
       setTimeout(() => {
        history("/Table_conseilleur")
       }, 100);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="app-main__outer">
      <div className="app-main__inner">
        <Banner title="Modifier  conseiller des ventes" icon="pe-7s-add-user" />
        <div className="main-card mb-3 card">
          <div className="card-body">
            <h5 className="card-title">Grid Rows</h5>
            <form className>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleNom" className>
                      nom
                    </label>
                    <input
                      name="Nom"
                      id="exampleNom"
                      placeholder="Nom"
                      type="text"
                      className="form-control"
                      onChange={(event) => ChangeNom(event)}
                      value={nom || ""}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplePrenom" className>
                      Prenom
                    </label>
                    <input
                      name="Prenom"
                      id="examplePrenom"
                      placeholder="prenom"
                      type="text"
                      className="form-control"
                      onChange={(event) => ChangePrenom(event)}
                      value={prenom || ""}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleEmail11" className>
                      Email
                    </label>
                    <input
                      name="email"
                      id="exampleEmail11"
                      placeholder="Example@gmail.com"
                      type="email"
                      className="form-control"
                      onChange={(event) => ChangeEmail(event)}
                      value={email || ""}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplePassword11" className>
                      Password
                    </label>
                    <input
                      name="password"
                      id="examplePassword11"
                      placeholder="******"
                      type="password"
                      className="form-control"
                      onChange={(event) => ChangePassword(event)}
                      value={password || ""}
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={HandleSubmit}
                className="mt-2 btn btn-primary"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
