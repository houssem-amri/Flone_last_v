const mongoose= require ("mongoose");
const PaymentSchema =mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    billing_details:{type:Object},
    card_details:{type:Object}

});
const Payment = mongoose.model("Payment",PaymentSchema);
module.exports = Payment;