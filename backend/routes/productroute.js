import express, { Router } from "express";
import {
    getProducts,
    getProductByid,
    saveproduct,
    updateproduct,
    deleteproduct
} from "../controllers/productcomtroller.js";

const router = express.Router();

router.get('/product',getProducts);
router.get('/product/:id',getProductByid);
router.post('/product',saveproduct);
router.patch('/product/:id',updateproduct);
router.delete('/product/:id',deleteproduct);

export default router;