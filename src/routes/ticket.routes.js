import { ticketModel } from "../../dao/models/ticket.model.js";
import ticketController from "../controllers/ticket.controller.js";
const express = require('express');
const router = express.Router();
router.post('/', ticketController.createTicket);
router.post('/:ticketId', ticketController.getTicketById);