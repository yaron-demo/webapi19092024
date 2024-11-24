const jwt=require('jsonwebtoken');
const PrivateKey=process.env.PRIVATE_KEY;
module.exports=(req,res,next)=>{
    try{
        const authStr=req.headers.authorization;// שליפת ההדר של האבטחה
        const Arr=authStr.split(' ');// פיצול המחרוזת לפי התו רווח
        const token=Arr[1];//שליפת הטוקן מהמערך בתא השני
        const userObj=jwt.verify(token,PrivateKey);// אימות הטוקן מול המערכת שהצפינה
        //req.token=token;// יצירת שדה בבקשה עם פרטי הטוקן
        req.email=userObj.email;// שמירת המזהה של הלקוח כשדה בבקשה
        next();// מעבר לשכבה הבאה
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({Msg:"Error Authenticating"});// החזרת הודעת שגיאה
    }
    
}