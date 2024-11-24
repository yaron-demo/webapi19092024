const mongoose=require('mongoose');// חיבור לספריית מונגוס
mongoose.pluralize(null);// ביטול פניה לטבלאות בלשון רבים באנגלית, הוספת האות אס אטומטית
// הגדרת סכימה עבור האוסף של משתמשים
var userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    uid:Number,
    email:String,
    pass:String
}); //
module.exports=mongoose.model('user',userSchema);// יצירת החיבור לטבלת/ המשתמשים




