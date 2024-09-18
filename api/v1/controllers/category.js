module.exports={
    getAllCategories:(req,res)=>{
        res.status(200).json({msg:"All Categorys"});
    },
    getCategoryById:(req,res)=>{
        res.status(200).json({msg:`Category By Id ${req.params.id}`});
    },
    addNewCategory:(req,res)=>{
        res.status(200).json({msg:"Added New Category",body:req.body});
    },
    updateCategoryById:(req,res)=>{
        res.status(200).json({msg:`Update Category ${req.params.id}`,body:req.body});
    },
    deleteCategory:(req,res)=>{
        res.status(200).json({Msg:`Category Deleted ${id}`});
    }
};