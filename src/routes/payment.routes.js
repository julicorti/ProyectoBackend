import { Router } from 'express';
import paymentController from '../controllers/payment.controller.js';

const paymentRouter = Router();

paymentRouter.post('/charge', paymentController.createCharge);

export default paymentRouter;
