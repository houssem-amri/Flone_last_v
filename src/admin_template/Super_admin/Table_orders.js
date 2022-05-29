import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Banner from "../Banner";
import { format } from "date-fns";
import Invoice from "./Invoice";
import ReactToPrint from "react-to-print";
const pageStyle = `
@media all {
  .page-header {
     overflow: hidden; height: 0; 
  }

}

@media print {
  html, body {
    height: initial !important;
    overflow: initial !important;
    -webkit-print-color-adjust: exact;
  }
}

@media print {
  .page-break {
    display: block;
    page-break-before: always;
  }
  .page-header{
    margin: 10mm;
    display: block;
    height: initial !important;
    overflow: initial !important;
    page-break-before: auto;
  }
  .invoice{
    display: flex !important;
    justify-content: center!important;
    align-items: center !important;
    width: auto !important;
    height: auto !important;
    break-inside: avoid;

    }
  
}

@page {
  size: auto;
  margin: 10mm;
}
`;
export default function Table_orders() {
  const [orders, setorders] = useState([]);
  const [orderSelected, setorderSelected] = useState({});
  const [print, setprint] = useState(false);
  const myRef = useRef();

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = () => {
    axios
      .get("http://localhost:3200/api/get_order")
      .then((result) => {
        console.log(result.data.data);
        setorders(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const PrintInvoice = (data) => {
    console.log("PrintInvoice", data);
    setorderSelected(data);
    setprint(true);
  };
  return (
    <div className="app-main__outer">
      <div className="app-main__inner">
        <Banner title="Tableau Order" icon="pe-7s-users" />
        <div className="main-card mb-3 card">
          <div className="card-body">
            <h5 className="card-title">tableau des orders</h5>
            <div className="row">
              <div className="col-12">
                <table
                  style={{ width: "100%" }}
                  id="example"
                  className="table table-hover table-striped table-bordered"
                >
                  <thead>
                    <tr>
                      <th>Nom d'utilisateur</th>
                      <th>Email d'utilisateur</th>
                      <th>Téléphone de l'utilisateur</th>
                      <th>produits</th>
                      <th>Date de commande</th>
                      <th>Prix ​​de la commande</th>
                      <th>État de la commande</th>
                      <th>Commander une impression</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((order, key) => (
                      <tr key={key}>
                        <td>
                          {order.userId.nom} {order.userId.prenom}
                        </td>
                        <td>{order.userId.email}</td>
                        <td>{order.userId.tel}</td>
                        <td>
                          {order.productsId.map((product, i) => (
                            <span key={i}> {product.name} , </span>
                          ))}
                        </td>
                        <td>
                          {format(
                            new Date(order.Order_date),
                            "dd MMM yyyy HH:mm:ss"
                          )}
                        </td>

                        <td>${order.prix}</td>
                        <td>{order.etat}</td>
                        <td>
                          <ReactToPrint
                            trigger={() => {
                              return (
                                <a
                                  href="#"
                                  className="mb-2 mr-2 btn-transition btn btn-outline-info"
                                  onClick={PrintInvoice(order)}
                                >
                                  <i
                                    className="pe-7s-print"
                                    style={{ fontSize: 18 }}
                                  ></i>{" "}
                                </a>
                              );
                            }}
                            documentTitle="Order Devis"
                            content={() => myRef.current}
                            pageStyle={pageStyle}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                
                </table>
              </div>
            </div>
          </div>
          <div
            className="page-header"
            ref={myRef}
            style={{ overflow: "hidden", height: 0 }}
          >
            {print ? <Invoice data={orderSelected} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
