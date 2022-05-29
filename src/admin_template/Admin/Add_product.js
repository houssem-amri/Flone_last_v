import axios from "axios";
import React, { useEffect, useState } from "react";
import Banner from "../Banner";
import { useHistory } from "react-router-dom";
import { RMIUploader } from "react-multiple-image-uploader";

const Categories = [
  { value: "fashion", label: "fashion" },
  { value: "kids", label: "kids" },
  { value: "electronics", label: "electronics" },
  { value: "furniture", label: "furniture" },
  { value: "plant", label: "plant" },
  { value: "organic food", label: "organic food" },
  { value: "flower", label: "flower" },
  { value: "book", label: "book" },
  { value: "cosmetics", label: "cosmetics" },
  { value: "accessories", label: "accessories" },
  { value: "handmade", label: "handmade" },
  { value: "auto parts", label: "auto parts" },
  { value: "pet food", label: "pet food" },
  { value: "medical", label: "medical" },
  { value: "black friday", label: "black friday" },
  { value: "cakes", label: "cakes" },
  { value: "christmas", label: "christmas" },
];
export default function Add_product() {
  const [nomproduit, setnomproduit] = useState("");
  const [Categorie, setCategorie] = useState([]);
  const [SousCategorie, setSousCategorie] = useState("");
  const [Prix, setPrix] = useState(0);
  const [fullDescription, setfullDescription] = useState("");
  const [shortDescription, setshortDescription] = useState("");
  const [Discount, setDiscount] = useState(0);
  const [offerEnd, setofferEnd] = useState("");
  const [newProduct, setNewProduct] = useState(false);
  const [rating, setrating] = useState(0);
  const [saleCount, setsaleCount] = useState(0);
  const [tag, settag] = useState("");

  const [stock, setstock] = useState([]);
  const [visible, setVisible] = useState(false);
  const [dataSources, setDatasources] = useState([]);

  let history = useHistory();

  useEffect(() => {}, [dataSources]);

  const hideModal = () => {
    setVisible(false);
  };
  const onUpload = (data) => {
    let images = [];
    for (let i = 0; i < data.length; i++) {
      images.push({
        id: i,
        file: data[i].file,
        dataURL: data[i].dataURL,
      });
    }

    setDatasources(images);
  };
  const onSelect = (data) => {};

  const onRemove = (id) => {
    for (let i = 0; i < dataSources.length; i++) {
      if (dataSources[i].id === id) {
        dataSources.splice(i, 1);
        setDatasources(dataSources);
      }
    }
  };

  const changenomproduit = (event) => {
    setnomproduit(event.target.value);
  };

  const Handlesubmit = () => {
    let category=[]

    const formData = new FormData();
    for (let i = 0; i < dataSources.length; i++) {
      formData.append("image", dataSources[i].file);
    }
    if (Categorie === "fashion" || Categorie === "kids") {
      category.push(Categorie,SousCategorie)

      let variation = [
        {
          color: "white",
          image: "/assets/img/product/fashion/1.jpg",
          size: [
            {
              name: "x",
              stock: stock,
            },
            {
              name: "m",
              stock: stock,
            },
            {
              name: "xl",
              stock: stock,
            },
          ],
        },
        {
          color: "brown",
          image: "/assets/img/product/fashion/3.jpg",
          size: [
            {
              name: "x",
              stock: stock,
            },
            {
              name: "m",
              stock: stock,
            },
            {
              name: "xl",
              stock: stock,
            },
          ],
        },
        {
          color: "black",
          image: "/assets/img/product/fashion/8.jpg",
          size: [
            {
              name: "x",
              stock: stock,
            },
            {
              name: "m",
              stock: stock,
            },
            {
              name: "xl",
              stock: stock,
            },
          ],
        },
      ];
      formData.append("name", nomproduit);
      formData.append("category", JSON.stringify(category));
      formData.append("price", Prix);
      formData.append("discount", Discount);
      formData.append("offerEnd", offerEnd);
      formData.append("new", newProduct);
      formData.append("rating", rating);
      formData.append("saleCount", saleCount);
      formData.append("tag", tag);
      formData.append("variation", JSON.stringify(variation));
      formData.append("shortDescription", shortDescription);
      formData.append("fullDescription", fullDescription);
      console.log("gegegeg",category);

    } else {
      category.push(Categorie)

      formData.append("name", nomproduit);
      formData.append("category", JSON.stringify(category));
      formData.append("price", Prix);
      formData.append("discount", Discount);
      formData.append("offerEnd", offerEnd);
      formData.append("new", newProduct);
      formData.append("rating", rating);
      formData.append("saleCount", saleCount);
      formData.append("tag", tag);
      formData.append("stock", stock);
      formData.append("shortDescription", shortDescription);
      formData.append("fullDescription", fullDescription);
    }
    console.log("gegegeg",category);

    axios
      .post("http://localhost:3200/api/ajouter_Produits", formData)
      .then((response) => {
        console.log("here response", response.data.message);

        history.push("/Table_product");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="app-main__outer">
      <div className="app-main__inner">
        <Banner title="Ajouter produits" icon="pe-7s-cart" />
        <div className="main-card mb-3 card">
          <div className="card-body">
            <h5 className="card-title">remplir formulaire</h5>
            <form>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplenomproduit">nom produit</label>
                    <input
                      name=" nom produit"
                      id="examplenomproduit"
                      placeholder="nom produit"
                      type="text"
                      className="form-control"
                      onChange={(event) => changenomproduit(event)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleSelect">nom categorie</label>
                    <select
                      name="select"
                      id="exampleSelect"
                      className="form-control"
                      onChange={(event) => setCategorie(event.target.value)}
                    >
                      <option value="">select categorie</option>

                      {Categories?.map((value, i) => (
                        <option key={i} value={value.value}>
                          {value.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {Categorie === "fashion" || Categorie === "kids" ? (
                  <div className="col-md-6">
                    <div className="position-relative form-group">
                      <label htmlFor="exampleSelect">Sous categorie</label>
                      <select
                        name="select"
                        id="exampleSelect"
                        className="form-control"
                        onChange={(event) =>
                          setSousCategorie(event.target.value)
                        }
                      >
                        <option value="">select Sous categorie</option>

                        <option value="men">men</option>
                        <option value="women">women</option>
                      </select>
                    </div>
                  </div>
                ) : null}

                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplePrix">Prix</label>
                    <input
                      name="Prix"
                      id="examplePrix"
                      placeholder="Prix"
                      type="number"
                      className="form-control"
                      onChange={(event) => setPrix(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplecode">Stock</label>
                    <input
                      name="code"
                      id="examplecode"
                      placeholder="discount"
                      type="number"
                      className="form-control"
                      onChange={(event) => setstock(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplecode">Tag de produit</label>
                    <input
                      name="code"
                      id="examplecode"
                      placeholder="discount"
                      type="text"
                      className="form-control"
                      onChange={(event) => settag(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplecode">discount</label>
                    <input
                      name="code"
                      id="examplecode"
                      placeholder="discount"
                      type="number"
                      className="form-control"
                      onChange={(event) => setDiscount(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplecode">sale Count</label>
                    <input
                      name="code"
                      id="examplecode"
                      placeholder="discount"
                      type="number"
                      className="form-control"
                      onChange={(event) => setsaleCount(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplecode">offer End</label>
                    <input
                      name="code"
                      id="examplecode"
                      placeholder="discount"
                      type="date"
                      className="form-control"
                      onChange={(event) => setofferEnd(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleSelect">nouveautés de produit</label>
                    <select
                      name="select"
                      id="exampleSelect"
                      className="form-control"
                      onChange={(event) => setNewProduct(event.target.value)}
                    >
                      <option value={false}>
                        select nouveautés de produit
                      </option>

                      <option value={true}>New</option>
                      <option value={false}>Old</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleSelect">Product rating</label>
                    <select
                      name="select"
                      id="exampleSelect"
                      className="form-control"
                      onChange={(event) => setrating(event.target.value)}
                    >
                      <option value={0}>select Product rating</option>

                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="position-relative form-group">
                    <label htmlFor="examplePrix">Images</label>
                    <RMIUploader
                      isOpen={visible}
                      hideModal={hideModal}
                      onSelect={onSelect}
                      onUpload={onUpload}
                      onRemove={onRemove}
                      dataSources={dataSources}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleDescription">shortDescription</label>
                    <textarea
                      name="Description"
                      id="exampleDiscription"
                      type="text"
                      className="form-control"
                      onChange={(event) =>
                        setshortDescription(event.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleDescription">fullDescription</label>
                    <textarea
                      name="Description"
                      id="exampleDiscription"
                      type="text"
                      className="form-control"
                      onChange={(event) =>
                        setfullDescription(event.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={Handlesubmit}
                className="mt-2 btn btn-primary"
              >
                ajouter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
