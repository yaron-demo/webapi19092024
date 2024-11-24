const mysql=require('mysql');
// חיבור לבסיס נתונים טבלאי מסוג MySql
var MySqlDB=mysql.createPool({
    connectionLimit:100,
    database:"ecomdb",
    host:"localhost",
    port:3306,
    user:"yaron2",
    password:"123" 
});// יצירת חיבור לבסיס הנתונים עם מאגר קונקשנים מוגדר מראש
module.exports=MySqlDB;