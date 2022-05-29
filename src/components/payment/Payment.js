import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Checkout from "./CheckoutForm";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
const Payment = ({ location }) => {
  const { pathname } = location;
  let params = useParams();

  const [Order, setOrder] = useState({});

  useEffect(() => {
    getOrderById();

  }, []);

  const getOrderById = () => {
    axios
      .get(`http://localhost:3200/api/get_order_By_id/${params.id}`)
      .then((res) => {
        setOrder(res.data.data)
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Checkout</title>
        <meta
          name="description"
          content="Checkout page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Payment
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="item-empty-area text-center">
                  {/* <StripeContainer/> */}

                  <div className="item-empty-area__icon mb-30">
                    <div className="login-register-area pt-1 pb-1">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-8 col-md-12 ml-auto mr-auto">
                            <div className="login-register-wrapper">
                              <Tab.Container defaultActiveKey="register">
                                <Nav
                                  variant="pills"
                                  className="login-register-tab-list"
                                >
                                  <Nav.Item>
                                    <Nav.Link eventKey="register">
                                      <h4>Payment </h4>
                                    </Nav.Link>
                                  </Nav.Item>
                                </Nav>
                                <div className="login-form-container">
                                  <div className="row">
                                    <div className="col-lg-12 col-md-12 ml-auto mr-auto ">
                                      <Checkout Order={Order} />
                                    </div>
                                  </div>
                                </div>
                              </Tab.Container>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item-empty-area__text">
                    <Link to={process.env.PUBLIC_URL + "/"}>Anuller</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};
export default Payment;
