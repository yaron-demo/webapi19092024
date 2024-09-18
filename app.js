require('dotenv').config();// הפעלת הפונקיה של דוט אי אנ וי
const express=require('express');
const app=express();
const cors=require('cors');
const morgan=require('morgan');
const mongoose=require('mongoose');
const productRouter=require('./api/v1/routes/product');
const categoryRouter=require('./api/v1/routes/category');

// הגדרות חיבור לבסיס הנתונים של מונגו
let mongoPass=process.env.MONGO_PASS;
let mongoUser=process.env.MONGO_USER;
let mongoServer=process.env.MONGO_SERVER;
let mongoDbName=process.env.MONGO_DBNAME;
const mongoConnStr=`mongodb+srv://${mongoUser}:${mongoPass}@${mongoServer}/${mongoDbName}`;
mongoose.connect(mongoConnStr);
var DB=mongoose.connection;


app.use(morgan('dev'));// הוספת השכבה של מורגן שמטפלת בתיעוד הבקשות בקונסול
app.use(cors());// הוספת שכבת הביננים של קורס cors, גישה ממקורות חיצוניים בפורמט אג'קס
app.use(express.json());// שכבה המטפלת בבקשות שנשלחו בפורמט ג'ייסון
app.use(express.urlencoded({extended:true}));// שכבה המטפלת בבקשות שנשלחו בפורמט יוא ארל אנקודד
// app.use((req,res,next)=>{

//     if(req.headers['content-type']=='aplice/ json')
//     {


//         req.body=xxxx;
//     }
//     next();

// });


app.use('/product',productRouter);// הפניית בקשות של מוצרים אל הראוטר שמטפל בהם
app.use('/category',categoryRouter);// הפניית בקשות של קטגוריות אל הראוטר שמטפל בהם

app.all('*',(req,res)=>{
    res.status(404).json({msg:"Not Found 404"});
});

module.exports=app;