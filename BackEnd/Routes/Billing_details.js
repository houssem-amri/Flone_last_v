const express = require("express");

const Billing_details = require("../Models/Billing_details");

const router = express.Router();

router.post("/add_Billing_details", (req, res, next) => {
  const billing = new Billing_details({
    userId: req.body.userId,
    Country: req.body.Country,
    Street: req.body.Street,
    second_Street: req.body.second_Street,
    Town: req.body.Town,
    State: req.body.State,
    Postcode: req.body.Postcode,
  });
  billing
    .save()
    .then(
      res.status(200).json({
        message: "billing added succesful",
      })
    )
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/get_Billing_details_byId/:id", (req, res) => {
  Billing_details.findOne({ userId: req.params.id }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        billing: findedObject,
      });
    } else {
      res.status(200).json({
        billing: "empty",
      });
    }
  });
});

router.get("/get_Billing_details_Checkout/:id", (req, res) => {
    Billing_details.findOne({ userId: req.params.id }).then((findedObject) => {
      if (findedObject) {
        res.status(200).json({
          billing: findedObject,
        });
      } else {
        res.status(200).json({
          billing: "empty",
        });
      }
    });
  });

router.put("/Update_Billing_details", (req, res) => {
  const billing = new Billing_details({
    userId: req.body.userId,
    Country: req.body.Country,
    Street: req.body.Street,
    second_Street: req.body.second_Street,
    Town: req.body.Town,
    State: req.body.State,
    Postcode: req.body.Postcode,
  });
  Billing_details.updateOne({ _id: req.body._id }, billing).then(
    res.status(200).json({
      message: "billing updated successfuly",
    })
  );
});

module.exports = router;
