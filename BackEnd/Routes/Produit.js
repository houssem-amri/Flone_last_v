const express = require("express");
const router = express.Router();

const Produit = require("../Models/Produit");
const path = require("path");

const multer = require("multer");

// cofiguration d'image
const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "BackEnd/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-product-" + "." + extension;
    cb(null, imgName);
  },
});

router.post(
  "/ajouter_Produits",
  multer({ storage: storage }).array("image"),
  (req, res) => {
    let Images = [];

    url = req.protocol + "://" + req.get("host");
    for (let i = 0; i < req.files.length; i++) {
      Images.push(url + "/images/" + req.files[i].filename);
    }

    if (
      JSON.parse(req.body.category)[0] === "fashion" ||
      JSON.parse(req.body.category)[0] === "kids"
    ) {
      const produit = new Produit({
        name: req.body.name,
        category: JSON.parse(req.body.category),
        price: Number(req.body.price),
        discount: Number(req.body.discount),
        offerEnd: Date(req.body.offerEnd),
        new: Boolean(req.body.new),
        rating: Number(req.body.rating),
        saleCount: Number(req.body.saleCount),
        image: Images,
        tag: [req.body.tag],
        variation: JSON.parse(req.body.variation),
        shortDescription: req.body.shortDescription,
        fullDescription: req.body.fullDescription,
      });
      // console.log("rererrere",produit);
      produit.save();
      res.status(200).json({
        message: "Produit added succesful",
      });
    } else {
      const produit = new Produit({
        name: req.body.name,
        category: JSON.parse(req.body.category),
        price: Number(req.body.price),
        discount: Number(req.body.discount),
        offerEnd: Date(req.body.offerEnd),
        new: Boolean(req.body.new),
        rating: Number(req.body.rating),
        saleCount: Number(req.body.saleCount),
        image: Images,
        tag: [req.body.tag],
        stock: Number(req.body.stock),
        shortDescription: req.body.shortDescription,
        fullDescription: req.body.fullDescription,
      });
      console.log("fefefefefef", produit);

      produit.save();
      res.status(200).json({
        message: "Produit added succesful",
      });
    }
  }
);
router.put(
  "/Update_Produit",
  multer({ storage: storage }).array("image"),
  (req, res) => {
    let Images = [];

    url = req.protocol + "://" + req.get("host");
    for (let i = 0; i < req.files.length; i++) {
      Images.push(url + "/images/" + req.files[i].filename);
    }

    if (
      JSON.parse(req.body.category)[0] === "fashion" ||
      JSON.parse(req.body.category)[0] === "kids"
    ) {
      const produit = {
        _id: req.body._id,
        name: req.body.name,
        category: JSON.parse(req.body.category),
        price: Number(req.body.price),
        discount: Number(req.body.discount),
        offerEnd: Date(req.body.offerEnd),
        new: Boolean(req.body.new),
        rating: Number(req.body.rating),
        saleCount: Number(req.body.saleCount),
        image: Images,
        tag: [req.body.tag],
        variation: JSON.parse(req.body.variation),
        shortDescription: req.body.shortDescription,
        fullDescription: req.body.fullDescription,
      };
      // console.log("rererrere",produit);
      Produit.updateOne({ _id: req.body._id }, produit).then(
        res.status(200).json({
          message: "produit updated successfuly",
        })
      );
    } else {
      const produit = {
        _id: req.body._id,
        name: req.body.name,
        category: JSON.parse(req.body.category),
        price: Number(req.body.price),
        discount: Number(req.body.discount),
        offerEnd: Date(req.body.offerEnd),
        new: Boolean(req.body.new),
        rating: Number(req.body.rating),
        saleCount: Number(req.body.saleCount),
        image: Images,
        tag: [req.body.tag],
        stock: Number(req.body.stock),
        shortDescription: req.body.shortDescription,
        fullDescription: req.body.fullDescription,
      };

      Produit.updateOne({ _id: req.body._id }, produit).then(
        res.status(200).json({
          message: "produit updated successfuly",
        })
      );
    }
  }
);

router.get("/get_produit", (req, res) => {
  Produit.find((err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        data: docs,
      });
    }
  });
});

router.delete("/delete_produit/:id", (req, res) => {
  console.log("herreeeeeee id ", req.params.id);
  Produit.deleteOne({ _id: req.params.id }).then(
    res.status(200).json({
      message: "produit deleted succesful",
    })
  );
});
router.get("/get_Produit_byId/:id", (req, res) => {
  Produit.findOne({ _id: req.params.id }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        produit: findedObject,
      });
    }
  });
});
// router.put("/Update_Produit", (req, res) => {
//   const produit = {
//     _id: req.body._id,
//     nomProduit: req.body.nomProduit,
//     categorie: req.body.categorie,
//     code: req.body.code,
//     quantite: req.body.quantite,
//     prix: req.body.prix,
//     description: req.body.description,
//   };
//   Produit.updateOne({ _id: req.body._id }, produit).then(
//     res.status(200).json({
//       message: "produit updated successfuly",
//     })
//   );
// });

router.post("/update_Product_quantity", async (req, res) => {
  for (let i = 0; i < req.body.length; i++) {
    const update = await Produit.updateOne(
      { _id: req.body[i]._id },
      req.body[i]
    );
  }
  res.status(200).json({
    message: "produit updated successfuly",
  });
});
module.exports = router;
