const bcrypt=require('bcrypt');// חיבור לספריית בי קריפט לצורך הצפנה של הסיסמה לפני השמירה בבסיס הנתונים
const DbConn=require('../config/MySqlDb');// חיבור לקונקשן של בסיס הנתונים מסוג mysql
const jwt=require('jsonwebtoken');
const PrivateKey=process.env.PRIVATE_KEY;
module.exports={
   
    Register:(req,res)=>{ // הרשמה
        const {email,pass,fullname}=req.body;
        let Sql=`select * from t_users where email='${email}'`;
        DbConn.query(Sql,function(error,results,fields){
            if(error)// במידה והתרחשה שגייאה במערכת
                return res.status(500).json(error);
            if(results.length>0)// במידה וקיים משתמש עם אותו מייל
                return res.status(400).json({msg:"User Already Exists"});
            // המשתמש לא קיים במערכת, ניתן לבצע הרשמה
            Sql="insert into t_users (email,pass,fullname) values";
            
            bcrypt.hash(pass,10,(error,hashPass)=>{
                if(error)
                    return res.status(500).json(error);
                Sql=Sql+ ` ('${email}','${hashPass}','${fullname}')`;
                console.log(hashPass);
                DbConn.query(Sql,function(error,results,fields){
                    if(error)
                        return res.status(500).json(error);
                    return res.status(200).json(results);
                });
            });
            
        });
       
    },
    Login:(req,res)=>{// התחברות
        const {email,pass}=req.body;
        let Sql=`select * from t_users where email='${email}'`;
        DbConn.query(Sql,function(error,results,fields){
            if(error)// במידה והתרחשה שגייאה במערכת              
                 return res.status(500).json(error);              
            if(results.length<1)// במידה ולא קיים משתמש עם המייל
                return res.status(400).json({msg:"User Not Exists"});
            // המשתמש  קיים במערכת, כעת נבדוק האם הסיסמה תקינה
            let hashPass=results[0].pass;            
            bcrypt.compare(pass,hashPass,(error,loginStatus)=>{
                console.log("error"+ error);
                    if(!loginStatus)
                        return res.status(401).json({msg:"User and / or Pass are wrong"});
                    const {email,fullname}=results[0];
                    req.session.user={email,fullname};
                    console.log(req.session);
                    return res.status(200).json({user:results[0].email});
                    // const token=jwt.sign({email,fullname},PrivateKey,{expiresIn:'1h'});
                    // return res.status(200).json({user:results[0].email,token});
            });
       
    });
}
}