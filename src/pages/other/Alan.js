import React, { useCallback, useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useSelector } from "react-redux";

const COMMANDS = {
  OPEN_CART: "open-cart",
  CLOSE_CART: "close-cart",
  FIND_PRODUCT: "find-product",
  OPEN_SHOP: "open-shop",
  OPEN_ESHOP: "open-eshop",
  OPEN_ESHOP_SELL: "open-eshop-sell",
  SIGNIN: "open-signin",
  SIGNUP: "open-signup",
  OPEN_PROTOTYPE: "open-prototype",
  OPEN_ALL_PROTOTYPE: "open-allprototype",
  OPEN_BID: "open-bid",
  OPEN_ROOM_BID: "open-roombid",
};

function useAlan() {
//   const cart = useSelector((state) => state.cart.cartItems);
  const [alanInstance, setAlanInstance] = useState();
//   const { products } = useSelector((state) => state.products);
//   console.log("for find ", products);

  //View Cart
  const openCart = useCallback(() => {
    alanInstance.playText("Opening cart");
    setTimeout(() => {
      window.location.replace(process.env.PUBLIC_URL + "/cart");
    }, 2000);
  }, [alanInstance]);

  //Close cart
  const closeCart = useCallback(() => {
    alanInstance.playText(" Closing Cart");
    setTimeout(() => {
      window.location.replace(process.env.PUBLIC_URL + "/");
    }, 2000);
  }, [alanInstance]);


  //open shop
  const openshop = useCallback(() => {
    alanInstance.playText(" Opening Shop");
    setTimeout(() => {
      window.location.replace(process.env.PUBLIC_URL + "/shop-grid-standard");
    }, 2000);
  }, [alanInstance]);



  

  //open sign in
  const signin = useCallback(() => {
    alanInstance.playText(" Opening signin  ");
    setTimeout(() => {
      window.location.replace(process.env.PUBLIC_URL + "/login-register");
    }, 2000);
  }, [alanInstance]);

  //sign up
  const signup = useCallback(() => {
    alanInstance.playText(" Opening signup  ");
    setTimeout(() => {
      window.location.replace(process.env.PUBLIC_URL + "/login-register");
    }, 2000);
  }, [alanInstance]);







  useEffect(() => {
    window.addEventListener(COMMANDS.OPEN_CART, openCart);
    window.addEventListener(COMMANDS.CLOSE_CART, closeCart);
    window.addEventListener(COMMANDS.OPEN_SHOP, openshop);
    window.addEventListener(COMMANDS.SIGNIN, signin);
    window.addEventListener(COMMANDS.SIGNUP, signup);
 
    return () => {
      window.addEventListener(COMMANDS.OPEN_CART, openCart);
      window.addEventListener(COMMANDS.CLOSE_CART, closeCart);
      window.addEventListener(COMMANDS.OPEN_SHOP, openshop);
      window.addEventListener(COMMANDS.SIGNIN, signin);
      window.addEventListener(COMMANDS.SIGNUP, signup);

    };
  }, [openCart, closeCart, ]);
//   products, findproduct
  useEffect(() => {
    setAlanInstance(
      alanBtn({
        left: "20px",
        top: "10px",
        key: "66f9b8ede991be50825781e561a5b3e52e956eca572e1d8b807a3e2338fdd0dc/prod",
        onCommand: ({ command, payload }) => {
          window.dispatchEvent(new CustomEvent(command, { detail: payload }));
        },
      })
    );
  }, []);
  return <div>Alan</div>;
}

export default useAlan;
