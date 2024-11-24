require('dotenv').config();// הפעלת הפונקיה של דוט אי אנ וי
const express=require('express');
const app=express();
const cors=require('cors');
const morgan=require('morgan');
const mongoose=require('mongoose');
const productRouter=require('./api/v1/routes/product');
const categoryRouter=require('./api/v1/routes/category');
const userRouter=require('./api/v1/routes/user');
const mysql=require('mysql');

const session=require('express-session');// קישור לספריית העבודה עם סשנים
const mongoStore=require('connect-mongo');// קישור לספרייתת העבודה עם שמירת סשנים במונגו דיבי
const MongoStore = require('connect-mongo');
const privateKey=process.env.PRIVATE_KEY;
// בדיקת שינוי
// הגדרות חיבור לבסיס הנתונים של מונגו
let mongoPass=process.env.MONGO_PASS;
let mongoUser=process.env.MONGO_USER;
let mongoServer=process.env.MONGO_SERVER;
let mongoDbName=process.env.MONGO_DBNAME;
const mongoConnStr=`mongodb+srv://${mongoUser}:${mongoPass}@${mongoServer}/${mongoDbName}`;
mongoose.connect(mongoConnStr);
var DB=mongoose.connection;





app.use(session({
    secret:privateKey,
    resave:true,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        path:'/',
        secure:false,
        maxAge:1000*60*20
    },
    store:MongoStore.create({
        mongoUrl:`mongodb+srv://${mongoUser}:${mongoPass}@${mongoServer}`
    })
}));

const auth=require('./api/v1/middlewares/auth');
const authS=require('./api/v1/middlewares/authS');
app.use(morgan('dev'));// הוספת השכבה של מורגן שמטפלת בתיעוד הבקשות בקונסול
app.use(cors());// הוספת שכבת הביננים של קורס cors, גישה ממקורות חיצוניים בפורמט אג'קס
app.use(express.json());// שכבה המטפלת בבקשות שנשלחו בפורמט ג'ייסון
app.use(express.urlencoded({extended:true}));// שכבה המטפלת בבקשות שנשלחו בפורמט יוא ארל אנקודד
app.use('/product',productRouter);// הפניית בקשות של מוצרים אל הראוטר שמטפל בהם
//app.use('/product',authS,productRouter);// הפניית בקשות של מוצרים אל הראוטר שמטפל בהם
app.use('/category',categoryRouter);// הפניית בקשות של קטגוריות אל הראוטר שמטפל בהם
app.use('/user',userRouter); // הפנית בקשות של רישום והתחברות אל האוטר של משתמש

app.all('*',(req,res)=>{
    res.status(404).json({msg:"Not Found 404"});
});

module.exports=app;