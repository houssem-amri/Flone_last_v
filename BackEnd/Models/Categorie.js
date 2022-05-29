const mongoose= require ("mongoose");
const CategorieSchema =mongoose.Schema({
    Categorie :{type : String},
});
const Categorie = mongoose.model("categorie",CategorieSchema);
module.exports = Categorie;