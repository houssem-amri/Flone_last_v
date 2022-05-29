import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Banner from "../Banner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  nom: yup.string().required("Vous devez entrer votre nom"),
  prenom: yup.string().required("Vous devez entrer votre prenom"),
  email: yup
    .string()
    .email("Vous devez entrer un email valide")
    .required("Vous devez entrer un email"),
  password: yup
    .string()
    .required("S'il vous plait entrez votre mot de passe.")
    .min(
      3,
      "Le mot de passe est trop court - doit comporter au moins 3 caractères."
    ),
});

export default function Add_conseilleur() {

  const [MsgErr, setMsgErr] = useState("");

  const role = "conseilleur";
  let history = useHistory();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid, dirtyFields },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",

    resolver: yupResolver(schema),
  });

  const onSubmit = (event) => {
    let data = {
      nom: event.nom,
      prenom: event.prenom,
      email: event.email,
      password: event.password,
      role: role,
    };
    console.log("here response", event);

    axios
      .post("http://localhost:3200/api/add_users", data)
      .then((response) => {
        setMsgErr(response.data.message);
        if (response.data.message === "1") {
          history.push("/Table_conseilleur");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="app-main__outer">
      <div className="app-main__inner">
        <Banner title="Ajouter conseilleur de vente" icon="pe-7s-add-user" />
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
                      {...register("nom")}
                      id="nom"
                      placeholder="nom"
                      type="text"
                      className="form-control"
                    />
                    <span className="text-danger">{errors.nom?.message}</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplePrenom" className>
                      Prenom
                    </label>
                    <input
                      {...register("prenom")}
                      id="prenom"
                      placeholder="prenom"
                      type="text"
                      className="form-control"
                    />
                    <span className="text-danger">
                      {errors.prenom?.message}
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleEmail11" className>
                      Email
                    </label>
                    <input
                      {...register("email")}
                      id="email"
                      placeholder="Example@gmail.com"
                      type="email"
                      className="form-control"
                    />
                    <span className="text-danger">
                      {" "}
                      {errors.email?.message}
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplePassword11" className>
                      Password
                    </label>
                    <input
                      {...register("password")}
                      id="password"
                      placeholder="******"
                      type="password"
                      className="form-control"
                    />
                    <span className="text-danger">
                      {" "}
                      {errors.password?.message}
                    </span>
                  </div>
                </div>
                {MsgErr === "0" ? (
                  <span className="text-danger">E-mail déjà existe</span>
                ) : MsgErr === "1" ? (
                  <span className="text-success">
                    votre compte a été créé avec succès
                  </span>
                ) : null}
              </div>
              <button
                type="button"
                disabled={Object.keys(errors).length === 0 ? false : true}
                onClick={() => onSubmit(getValues())}
                className="mt-2 btn btn-primary"
              >
                Ajouter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
