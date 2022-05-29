const express = require("express");

const Order = require("../Models/Order");
const Order_quantity = require("../Models/orderQuantity");

const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

router.get("/get_order", (req, res) => {
  Order.find()
    .populate({
      path: "userId",
    })
    .populate({
      path: "billingId",
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

router.post("/add_order", (req, res, next) => {
  const order = new Order({
    _id: ObjectId(),
    userId: req.body.userId,
    billingId: req.body.billingId,
    productsId: req.body.productsId,
    prix: req.body.prix,
    Order_notes: req.body.Order_notes,
    Order_date: req.body.Order_date,
    etat: req.body.etat,
  });
  order
    .save()
    .then(
      res.status(200).json({
        order: order,
      })
    )
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
router.get("/get_order_By_id/:id", (req, res) => {
  Order.findOne({ _id: req.params.id }).exec(function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        data: docs,
      });
    }
  });
});

router.put("/update_order_By_id/:id", (req, res) => {
  Order.updateOne({ _id: req.params.id }, req.body).then(() => {
    for (let i = 0; i < req.body.productsId.length; i++) {
      const qty = new Order_quantity({
        order_id: req.body._id,
        product_id: req.body.productsId[i]._id,
        product_quantity: req.body.productsId[i].quantity,
      });
      qty.save();
    }

    res.status(200).json({
      message: "order updated",
    });
  });
});
router.get("/get_order/:id", (req, res) => {
  Order.find({ userId: req.params.id })
    .populate({
      path: "userId",
    })
    .populate({
      path: "billingId",
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
