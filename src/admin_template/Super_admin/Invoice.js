import React, { useContext } from "react";
import { format } from "date-fns";

export default function Invoice(props) {
  const CurrentUser=JSON.parse(localStorage.getItem("redux_localstorage_simple")||'{}')

    const {data}=props
  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="card-header">
            Invoice
            <strong> {format(new Date(Date.now()), "dd MMM yyyy ")}</strong>
            <span className="float-right">
              {" "}
              <strong>Status:</strong> Placed
            </span>
          </div>
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-6">
                <h6 className="mb-3">From:</h6>
                <div>
                  <strong>Flone</strong>
                </div>
                <div>{CurrentUser.userData.userNom} {CurrentUser.userData.userPrenon}</div>
                <div>71-101 Szczecin, Poland</div>
                <div>Email: {CurrentUser.userData.email}</div>
                <div>Phone: +48 444 666 3333</div>
              </div>
              <div className="col-6 float-right">
                <h6 className="mb-3">To:</h6>
                <div>
                  <strong>{data.userId?.nom} {data.userId?.prenom}</strong>
                </div>
                <div>Country: {data.billingId.Country} </div>
                <div>Town: {data.billingId.Town}</div>
                <div>Street: {data.billingId.Street}</div>
                <div>Postcode: {data.billingId.Postcode}</div>
                <div>Email: {data.userId.email}</div>
                <div>Phone: {data.userId.tel}</div>
              </div>
            </div>
            <div className="table-responsive-sm">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="center">#</th>
                    <th>Item</th>
                    <th>Description</th>
                    <th className="right">Unit Cost</th>
                    <th className="center">Qty</th>
                    <th className="right">Total</th>
                  </tr>
                </thead>
                <tbody>
                    {data.productsId.map((product,i)=>(
                        <tr key={i}>
                    <td className="center">{i}</td>
                    <td className="left strong">{product.name}</td>
                    <td className="left">{product.shortDescription}</td>
                    <td className="right">${product.price}</td>
                    <td className="center">1</td>
                    <td className="right">${product.price}</td>
                  </tr>
                    ))}
                  
               
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-8"></div>
              <div className="col-4">
                <table className="table table-clear">
                  <tbody>
                    <tr>
                      <td className="left">
                        <strong>Subtotal</strong>
                      </td>
                      <td className="right">${data.prix}</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>Discount (20%)</strong>
                      </td>
                      <td className="right">$0.000</td>
                    </tr>
                  
                    <tr>
                      <td className="left">
                        <strong>Total</strong>
                      </td>
                      <td className="right">
                        <strong>${data.prix}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
