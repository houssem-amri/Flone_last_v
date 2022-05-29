const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  billingId: { type: mongoose.Schema.Types.ObjectId, ref: "Billing_details" },
  productsId: [],
  prix: { type: String },
  etat: { type: String },
  Order_notes: { type: String },
  Order_date: { type: Date },
});
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
