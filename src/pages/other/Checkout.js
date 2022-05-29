import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";

const Checkout = ({ location, cartItems, currency, products,user }) => {
  const { pathname } = location;
  let cartTotalPrice = 0;
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
  const [id, setid] = useState("");
  const [Order_notes, setOrder_notes] = useState("");
  let history = useHistory();
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
      .get(
        "http://localhost:3200/api/get_Billing_details_byId/" +
        user.userId
      )
      .then((res) => {
        let data = res.data.billing;
        console.log("datadatadatadatadata", data);
        if (data !== "empty") {
          setid(data._id);
          setCountry(data.Country);
          setStreet(data.Street);
          setsecond_Street(data.second_Street);
          setTown(data.Town);
          setState(data.State);
          setPostcode(data.Postcode);
        }
      })
      .catch((err) => console.log(err));
  };

  const addOrders = () => {
    if (user.userId === undefined) {
      history.push("/login-register");
    } else {
      let price = 0;
      let productsId = [];
      for (let i = 0; i < cartItems.length; i++) {
        productsId.push(cartItems[i]);
        const discountedPrice = getDiscountPrice(
          cartItems[i].price,
          cartItems[i].discount
        );
        const finalProductPrice = (
          cartItems[i].price * currency.currencyRate
        ).toFixed(2);
        const finalDiscountedPrice = (
          discountedPrice * currency.currencyRate
        ).toFixed(2);

        if (discountedPrice != null) {
          price += finalDiscountedPrice * cartItems[i].quantity;
        } else {
          price += finalProductPrice * cartItems[i].quantity;
        }
      }

      let dataOrder = {
        userId: user.userId,
        billingId: id,
        productsId: productsId,
        prix: price,
        Order_notes: Order_notes,
        Order_date: Date.now(),
        etat:"non payé"
      };
      axios
        .post("http://localhost:3200/api/add_order", dataOrder)
        .then((res) => {
          let data = res.data.order;

          history.push("/payment/"+data._id );
        })
        .catch((err) => console.log(err));
     
  

      
    }
  };

  // const UpdateProduct = (data) => {
  //   let newProduct = [];

  //   for (let i = 0; i < data.length; i++) {
  //     const filter = FilterProduct(data[i]);
  //     newProduct.push(filter);
  //   }
  //   console.log("newProduct", newProduct);
  //   axios.post("http://localhost:3200/api/update_Product_quantity",newProduct).then((res)=>{
  //     console.log(res.data.message);
  //   }).catch(err=>console.log(err))
  // };

  // const FilterProduct = (data) => {
  //   let newProduct = [];
  //   for (let i = 0; i < products.length; i++) {
  //     if (products[i]._id === data._id) {
  //       if (products[i].category[0] === "fashion") {
  //         for (let j = 0; j < products[i].variation.length; j++) {
  //           if (products[i].variation[j].color === data.selectedProductColor) {
  //             for (let k = 0; k < products[i].variation[j].size.length; k++) {
  //               if (
  //                 products[i].variation[j].size[k].name ===
  //                   data.selectedProductSize &&
  //                 products[i].variation[j].size[k].stock !== 0
  //               ) {
  //                 products[i].variation[j].size[k].stock =
  //                   products[i].variation[j].size[k].stock - data.quantity;
  //                 break;
  //               }
  //             }
  //           }
  //         }
  //         newProduct.push(products[i]);
  //       } else {
  //         products[i].stock = products[i].stock - data.quantity;
  //         newProduct.push(products[i]);

  //         break;
  //       }
  //     }
  //   }
  //   return newProduct[0];
  // };
  
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
        Checkout
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>First Name</label>
                          <input
                            type="text"
                            value={nom}
                            onChange={(e) => setnom(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input
                            type="text"
                            value={prenom}
                            onChange={(e) => setprenom(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Country</label>
                          <select
                            value={Country}
                            onChange={(e) => setCountry(e.target.value)}
                          >
                            <option>Select a country</option>
                            <option>Tunis</option>
                            <option>Jendouba</option>
                            <option>Kef</option>
                            <option>Mahdia</option>
                            <option>Biserte</option>
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
                            onChange={(e) => setStreet(e.target.value)}
                          />
                          <input
                            placeholder="Apartment, suite, unit etc."
                            type="text"
                            value={second_Street}
                            onChange={(e) => setsecond_Street(e.target.value)}
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
                            onChange={(e) => setPostcode(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input
                            type="text"
                            value={tel}
                            onChange={(e) => settel(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email Address</label>
                          <input
                            type="text"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          defaultValue={""}
                          onChange={() => setOrder_notes()}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                cartItem.price,
                                cartItem.discount
                              );
                              const finalProductPrice = (
                                cartItem.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? currency.currencySymbol +
                                        (
                                          finalDiscountedPrice *
                                          cartItem.quantity
                                        ).toFixed(2)
                                      : currency.currencySymbol +
                                        (
                                          finalProductPrice * cartItem.quantity
                                        ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>Free shipping</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {currency.currencySymbol +
                                cartTotalPrice.toFixed(2)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button
                        type="button"
                        className="btn-hover"
                        onClick={addOrders}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
    products: state.productData.products,
    user: state.userData,

  };
};

export default connect(mapStateToProps)(Checkout);
