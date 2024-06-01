import express, { Router } from "express" 
import authMiddleware from "../middleware/auth.js"
import { placeOrder,verifyOrder, userOrder, listOrders, changeStatus } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder)
orderRouter.post('/verify',  verifyOrder)
orderRouter.post('/userorder', userOrder)
orderRouter.get('/list', listOrders)
orderRouter.post('/status', changeStatus)

export default orderRouter