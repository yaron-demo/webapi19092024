// נגדיר ראוטר עם כל הניתובים שלו ונייצא אותו
const router=require('express').Router();
const categoryController=require('../controllers/category');
router.get('/',categoryController.getAllCategories);
router.get('/:id',categoryController.getCategoryById);
router.post('/',categoryController.addNewCategory);
router.put('/:id',categoryController.updateCategoryById);
router.delete('/:id',categoryController.deleteCategory);

module.exports=router;
// category