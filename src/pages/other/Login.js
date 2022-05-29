import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { addConnectedUser } from "../../redux/actions/AuthAction";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
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
const Login = ({ addConnectedUser }) => {
  let history = useHistory();

  const [errorMsg, seterrorMsg] = useState("");
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
      email: event.email,
      password: event.password,
    };
    axios
      .post("http://localhost:3200/api/login", data)
      .then((response) => {
        const message = response.data.message;
        console.log("here response", response.data.message);
        if (message === "0") {
          seterrorMsg("Invalid Email");
        }
        if (message === "1") {
          seterrorMsg("Invalid Password");
        }
        if (message === "2") {
          addConnectedUser(response.data);
          if (response.data.role === "super_admin") {
            history.push("/Analyse");
          }
          if (response.data.role === "conseilleur") {
            history.push("/Analyse");
          }
          if (response.data.role === "client") {
            history.push("/");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Fragment>
      <div className="login-register-form ">
        <form name="formState" noValidate onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            id="Email"
            placeholder="Email"
            type="email"
          />
          <span className="text-danger"> {errors.email?.message}</span>

          <input
            {...register("password")}
            id="password"
            type="password"
            placeholder="Password"
          />
          <span className="text-danger"> {errors.password?.message}</span>
          <span style={{ color: "red" }}>{errorMsg}</span>
          <div className="button-box">
            <div className="login-toggle-btn">
              <input type="checkbox" />
              <label className="ml-10">Remember me</label>
              <Link to={process.env.PUBLIC_URL + "/"}>Forgot Password?</Link>
            </div>
            <button
              type="button"
              disabled={Object.keys(errors).length === 0 ? false : true}
              onClick={() => onSubmit(getValues())}
            >
              <span>Login</span>
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    addConnectedUser: (user) => {
      dispatch(addConnectedUser(user));
    },
  };
};
// Login.propTypes = {
//   location: PropTypes.object,
// };

export default connect(null, mapDispatchToProps)(Login);
