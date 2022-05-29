import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";
import Register from "./Register";
import Login from "./Login";
import { Divider } from "@mui/material";
const LoginRegister = ({ location }) => {
  const { pathname } = location;
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = () => {
    let data = {
      nom: nom,
      prenom: prenom,
      email: email,
      password: password,
      role: "client",
    };
    axios
      .post("http://localhost:3200/api/add_users", data)
      .then((response) => {
        console.log("here response", response.data.message);

        // history.push("/Table_product");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Register | Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-50 pb-50">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="register">
                    <div className="login-form-container">
                      <div className="row">
                        <div className="col-lg-5 col-md-12 ml-auto mr-auto ">
                          <Nav
                            variant="pills"
                            className="login-register-tab-list"
                          >
                            <Nav.Item>
                              <Nav.Link eventKey="register">
                                <h4>Login </h4>
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                          <Login />
                        </div>
                        <Divider
                          orientation="vertical"
                          flexItem
                          sx={{ color: "#a749ff" }}
                        />
                        <div className="col-lg-6 col-md-12 ml-auto mr-auto">
                          <Nav
                            variant="pills"
                            className="login-register-tab-list"
                          >
                            <Nav.Item>
                              <Nav.Link eventKey="register">
                                <h4>Register </h4>
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                          <Register />
                        </div>
                      </div>
                    </div>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object,
};

export default LoginRegister ;
