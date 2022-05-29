const mongoose = require("mongoose");
const Billing_detailsSchema = mongoose.Schema({
    userId: { type: String },
    Country: { type: String },
    Street: { type: String },
    second_Street: { type: String },
    Town: { type: String },
    State: { type: String },
    Postcode: { type: String },
  
});
const Billing_details = mongoose.model("Billing_details", Billing_detailsSchema);
module.exports = Billing_details;