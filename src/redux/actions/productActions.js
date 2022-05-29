import axios from "axios";

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

// fetch products
export const fetchProducts = () => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3200/api/get_produit`)
      .then((response) => {
        const products = response.data.data;

        dispatch({
          type: FETCH_PRODUCTS_SUCCESS,
          payload: products,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};
