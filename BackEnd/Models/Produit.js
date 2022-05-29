const mongoose= require ("mongoose");
const ProduitSchema =mongoose.Schema({
  
},{strict:false});
const Produit = mongoose.model("Produit",ProduitSchema);
module.exports = Produit;