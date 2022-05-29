const express = require("express");
const Categorie = require ("../Models/Categorie")


const router = express.Router();
router.post("/ajouter_categorie", (req, res) => {
    console.log("hello req .body", req.body);
    const categorie = new Categorie({
      Categorie: req.body.Categorie,
    });
    categorie.save();
    res.status(200).json({
      message: "Categorie added succesful"
    });
  });
  router.get("/get_categorie", (req, res) => {
    Categorie.find((err, docs) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          data: docs,
        });
      }
    });
  });
  router.delete("/delete_categorie/:id", (req, res) => {
    console.log("herreeeeeee id ", req.params.id);
    Categorie.deleteOne({ _id: req.params.id }).then(
      res.status(200).json({
        message: "categorie deleted succesful",
      })
    );
  });
  router.get("/get_categorie_byId/:id", (req, res) => {
   Categorie.findOne({ _id: req.params.id }).then((findedObject) => {
       if (findedObject) {
         res.status(200).json({
           categorie: findedObject,
         });
       }
     });
   });
   router.put("/Update_categorie", (req, res) => {
    const categorie = {
     _id: req.body._id,
     Categorie: req.body.Categorie,
     
   };
   Categorie.updateOne({ _id: req.body._id },categorie).then(
     res.status(200).json({
       message: "categorie updated successfuly",
     })
   );
 })

  module.exports = router;