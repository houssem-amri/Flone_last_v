const express = require("express");
const router = express.Router();

const Payment = require("../Models/Payment");

router.post("/add_payment", (req, res, next) => {
  const payment = new Payment({
    user_id: req.body.user_id,
    billing_details: req.body.billing_details,
    card_details: req.body.card_details,
  });
  payment
    .save()
    .then(
      res.status(200).json({
        message: "payment added",
      })
    )
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/get_payment", (req, res) => {
  Payment.find()
    .populate({
      path: "user_id",
    })
    .exec(function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          data: docs,
        });
      }
    });
});



module.exports = router;
