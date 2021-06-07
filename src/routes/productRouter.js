import express from 'express'; 
import checkauth from '../middlewares/checkauth.js';
import {productList,viewProduct} from  '../controllers/ProductsControllers.js';
const router = express.Router();
router.get('/',productList);
router.get('/:id',viewProduct);

export default router;