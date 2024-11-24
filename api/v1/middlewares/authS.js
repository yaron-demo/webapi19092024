module.exports=(req,res,next)=>{
    try{
        console.log(req.session);
        if(req.session.user==undefined)
        {
            return res.status(500).json({Msg:"Error Authenticating"});// החזרת הודעת שגיאה
        }
        next();// מעבר לשכבה הבאה
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({Msg:"Error Authenticating"});// החזרת הודעת שגיאה
    }
    
}