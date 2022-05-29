const mongoose= require ("mongoose");
const Order_quantitySchema =mongoose.Schema({
    
    product_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Produit'},
    product_quantity:Number,

});
const Order_quantity = mongoose.model("Order_quantity",Order_quantitySchema);
module.exports = Order_quantity;