import axios from "axios";
import React, { useEffect, useState } from "react";
import Banner from "../Banner";
import Modal_delete from "../Super_admin/Modal_delete";
import { useHistory } from "react-router-dom";

export default function Table_product() {
  const [Produit, setProduit] = useState([]);
  const [open, setOpen] = useState(false);
  const [produitSelected, setproduitSelected] = useState({});
  let history = useHistory();

  useEffect(() => {
    getAllProduit();
  }, []);
  const handleClickOpen = (Produit) => {
    setproduitSelected(Produit);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    getAllProduit();
  };

  const getAllProduit = () => {
    axios
      .get("http://localhost:3200/api/get_produit")
      .then((result) => {
        setProduit(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="app-main__outer">
      <div className="app-main__inner">
        <Banner title="Tableau produits" icon="pe-7s-cart" />
        <div className="main-card mb-3 card">
          <div className="card-body">
            <h5 className="card-title">tableau des produits</h5>
            <div className="row">
              <div className="col-12">
                <table
                  style={{ width: "100%" }}
                  id="example"
                  className="table table-hover table-striped table-bordered"
                >
                  <thead>
                    <tr>
                      <th>nomProduit</th>
                      <th>categorie</th>
                      <th>prix</th>
                      <th>discount</th>
                      <th>saleCount</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody style={{maxHeight: "80%"}}>
                    {Produit.map((value, i) => (
                      <tr key={i}>
                        <td>
                          <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left mr-3">
                                <div className="widget-content-left">
                                  <img
                                    width={40}
                                    className="rounded-circle"
                                    src={value.image[0]}
                                    alt
                                  />
                                </div>
                              </div>
                              <div className="widget-content-left flex2">
                                <div className="widget-heading">
                                  {value.name}
                                </div>
                               
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{value.category[0]}</td>
                        <td>{value.price}</td>
                        <td>{value.discount}</td>
                        <td>{value.saleCount}</td>
                     
                        <td>
                          <button
                            className="mb-2 mr-2 btn-transition btn btn-outline-info"
                            onClick={() =>
                              history.push("/Edit_produit/" + value._id)
                            }
                          >
                            <i
                              className="pe-7s-pen"
                              style={{ fontSize: 18 }}
                            ></i>
                          </button>
                          <button
                            className="mb-2 mr-2 btn-transition btn btn-outline-danger"
                            onClick={() => handleClickOpen(value)}
                          >
                            <i
                              className="pe-7s-trash"
                              style={{ fontSize: 18 }}
                            ></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                
                </table>
                {open ? (
                  <Modal_delete
                    data={produitSelected}
                    open={open}
                    type="produit"
                    onClose={handleClose}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
