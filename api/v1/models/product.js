const mongoose=require('mongoose');// חיבור לספריית מונגוס
mongoose.pluralize(null);// ביטול פניה לטבלאות בלשון רבים באנגלית, הוספת האות אס אטומטית
// הגדרת סכימה עבור האוסף של מוצרים
var productSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    pid:Number,
    pname:String,
    price:Number
});
module.exports=mongoose.model('product',productSchema);// יצירת החיבור לטבלת/ אוסף המוצרים




