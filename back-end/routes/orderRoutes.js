import express, { Router } from "express" 
import authMiddleware from "../middleware/auth.js"
import { placeOrder,verifyOrder, userOrder, listOrders } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder)
orderRouter.post('/verify', authMiddleware, verifyOrder)
orderRouter.post('/userorder',authMiddleware, userOrder)
orderRouter.get('/list', listOrders)

export default orderRouter