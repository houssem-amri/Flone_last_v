import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";
import { connect } from "react-redux";

const MyAccount = ({ location, user }) => {
  const { pathname } = location;
  const [email, setemail] = useState("");
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [tel, settel] = useState("");
  const [Country, setCountry] = useState("");
  const [Street, setStreet] = useState("");
  const [second_Street, setsecond_Street] = useState("");
  const [Town, setTown] = useState("");
  const [State, setState] = useState("");
  const [Postcode, setPostcode] = useState("");
  const [addMode, setAddmode] = useState(false);
  const [id, setid] = useState("");
  useEffect(() => {
    getUserById();
    getAdressBookById();
  }, []);
  const getUserById = () => {
    axios
      .get("http://localhost:3200/api/get_client_byId/" + user.userId)
      .then((res) => {
        console.log(res.data.user);
        let data = res.data.user;
        setemail(data.email);
        setnom(data.nom);
        setprenom(data.prenom);
        settel(data.tel);
      })
      .catch((err) => console.log(err));
  };

  const getAdressBookById = () => {
    axios
      .get("http://localhost:3200/api/get_Billing_details_byId/" + user.userId)
      .then((res) => {
        let data = res.data.billing;
        console.log("datadatadatadatadata", data);
        if (data === "empty") {
          setAddmode(true);
        } else {
          setid(data._id);
          setCountry(data.Country);
          setStreet(data.Street);
          setsecond_Street(data.second_Street);
          setTown(data.Town);
          setState(data.State);
          setPostcode(data.Postcode);
          setAddmode(false);
        }
      })
      .catch((err) => console.log(err));
  };
  const accountEdit = () => {
    let client = {
      _id: user.userId,
      nom: nom,
      prenom: prenom,
      tel: tel,
      email: email,
    };
    axios
      .put("http://localhost:3200/api/Update_client", client)
      .then((res) => {
        getUserById();
      })
      .catch((err) => console.log(err));
  };

  const accountAdressBook = () => {
    let object = {};
    if (addMode) {
      object = {
        userId: user.userId,
        Country: Country,
        Street: Street,
        second_Street: second_Street,
        Town: Town,
        State: State,
        Postcode: Postcode,
      };
      axios
        .post("http://localhost:3200/api/add_Billing_details", object)
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((err) => console.log(err));
    } else {
      object = {
        _id: id,
        userId: user.userId,
        Country: Country,
        Street: Street,
        second_Street: second_Street,
        Town: Town,
        State: State,
        Postcode: Postcode,
      };
      axios
        .put("http://localhost:3200/api/Update_Billing_details", object)
        .then((res) => {
          console.log(res.data.user);
          getAdressBookById();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | My Account</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        My Account
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Edit your account information{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>My Account Information</h4>
                              <h5>Your Personal Details</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>First Name</label>
                                  <input
                                    type="text"
                                    value={nom}
                                    onChange={(e) => setnom(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Last Name</label>
                                  <input
                                    type="text"
                                    value={prenom}
                                    onChange={(e) => setprenom(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Email Address</label>
                                  <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Telephone</label>
                                  <input
                                    type="text"
                                    value={tel}
                                    onChange={(e) => settel(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="button" onClick={accountEdit}>
                                  Continue
                                </button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="2">
                          <h3 className="panel-title">
                            <span>3 .</span> Modify your address book entries{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Address Book Entries</h4>
                            </div>
                            <div className="myaccount-info-wrapper">
                              <div className="row billing-info-wrap">
                                <div className="col-lg-12">
                                  <div className="billing-select mb-20">
                                    <label>Country</label>
                                    <select
                                      value={Country}
                                      onChange={(e) =>
                                        setCountry(e.target.value)
                                      }
                                    >
                                      <option value="">Select a country</option>
                                      <option value="Tunis">Tunis</option>
                                      <option value="Jendouba">Jendouba</option>
                                      <option value="Kef">Kef</option>
                                      <option value="Mahdia">Mahdia</option>
                                      <option value="Bizert">Bizert</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="billing-info mb-20">
                                    <label>Street Address</label>
                                    <input
                                      className="billing-address"
                                      placeholder="House number and street name"
                                      type="text"
                                      value={Street}
                                      onChange={(e) =>
                                        setStreet(e.target.value)
                                      }
                                    />
                                    <input
                                      placeholder="Apartment, suite, unit etc."
                                      type="text"
                                      value={second_Street}
                                      onChange={(e) =>
                                        setsecond_Street(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="billing-info mb-20">
                                    <label>Town / City</label>
                                    <input
                                      type="text"
                                      value={Town}
                                      onChange={(e) => setTown(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info mb-20">
                                    <label>State / County</label>
                                    <input
                                      type="text"
                                      value={State}
                                      onChange={(e) => setState(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info mb-20">
                                    <label>Postcode / ZIP</label>
                                    <input
                                      type="text"
                                      value={Postcode}
                                      onChange={(e) =>
                                        setPostcode(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  <button
                                    type="button"
                                    onClick={accountAdressBook}
                                  >
                                    Continue
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object,
  user: PropTypes.object,
};
const mapStateToProps = (state) => {
  return {
    user: state.userData,
  };
};
export default connect(mapStateToProps)(MyAccount);
