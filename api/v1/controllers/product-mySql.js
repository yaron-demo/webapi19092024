const DbConn=require('../config/MySqlDb');// חיבור לקונקשן של בסיס הנתונים מסוג mysql
module.exports={
    getAllProducts:(req,res)=>{
        let Sql="Select * from t_products";// req.email
        DbConn.query(Sql,function(error,results,fields){
            console.log(req.session);
            if(error)
                return res.status(500).json(error);
            return res.status(200).json(results);
        });
       
        
    },
    getProductById:(req,res)=>{
        productModel.find({pid:req.params.id}).then((prod)=>{
           
            return res.status(200).json(prod);
        });

    },
    addNewProduct:(req,res)=>{
        productModel.insertMany([req.body]).then((prod)=>{
           
            return res.status(200).json(prod);
        });
       
    },
    updateProductById:(req,res)=>{
        productModel.updateOne({pid:req.params.id},req.body).then((prod)=>{
           
            return res.status(200).json(prod);
        });
        
    },
    deleteProduct:(req,res)=>{
        productModel.deleteOne({pid:req.params.id}).then((prod)=>{
           
            return res.status(200).json(prod);
        });
    }
};