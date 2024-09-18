// נגדיר ראוטר עם כל הניתובים שלו ונייצא אותו
const router=require('express').Router();
const productController=require('../controllers/product');
router.get('/',productController.getAllProducts);
router.get('/:id',productController.getProductById);
router.post('/',productController.addNewProduct);
router.put('/:id',productController.updateProductById);
router.delete('/:id',productController.deleteProduct);

module.exports=router;
// category