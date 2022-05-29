import React, { Fragment, useState } from "react";

import axios from "axios";
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

  tel: yup
    .string()
    .required("S'il vous plait entrez votre Telephone ")
    .min(8, "Telephone est trop court - doit comporter au moins 8 caractères."),
});

const Register = () => {

  const [MsgErr, setMsgErr] = useState("");

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
      tel: event.tel,
      role: "client",
    };
    axios
      .post("http://localhost:3200/api/add_users", data)
      .then((response) => {
        setMsgErr(response.data.message);

        // history.push("/Table_product");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Fragment>
      <div>
        <div className="login-register-form">
          <form name="formState" noValidate onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("nom")}
              type="text"
              placeholder="Nom"
              id="nom"
              // onChange={(e) => setNom(e.target.value)}
            />
            <span className="text-danger">{errors.nom?.message}</span>

            <input
              {...register("prenom")}
              type="text"
              placeholder="Prenom"
              id="Prenom"

              // onChange={(e) => setPrenom(e.target.value)}
            />
            <span className="text-danger">{errors.prenom?.message}</span>

            <input
              {...register("email")}
              placeholder="Email"
              type="email"
              id="email"

              // onChange={(e) => setEmail(e.target.value)}
            />
            <span className="text-danger"> {errors.email?.message}</span>

            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              id="password"

              // onChange={(e) => setPassword(e.target.value)}
            />
            <span className="text-danger"> {errors.password?.message}</span>

            <input
              {...register("tel")}
              type="number"
              placeholder="Telephone "
              id="tel"

              //onChange={(e) => setTel(e.target.value)}
            />
            <span className="text-danger">{errors.tel?.message}</span>

            {MsgErr === "0" ? (
              <span className="text-danger">E-mail déjà existe</span>
            ) : MsgErr === "1" ? (
              <span className="text-success">
                votre compte a été créé avec succès
              </span>
            ) : null}

            <div className="button-box">
              <button
                type="button"
                disabled={Object.keys(errors).length === 0 ? false : true}
                onClick={() => onSubmit(getValues())}
              >
                <span>Register</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
