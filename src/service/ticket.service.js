import ticketController from "../controllers/ticket.controller.js";
import Cart from "../service/cart.service.js";
import { ticketModel } from "../../dao/models/ticket.model.js";

class Ticket{
    async getTicketById(id){
        try {
            return await ticketModel.find({_id: id})
           
        } catch (error) {
            console.error('Error al crear el ticket:', error);
       
        }
    }
    async createTicket({  amount, purchaser}){
        try {
            const code = Math.floor(Math.random() * 1000)
            console.log(amount)
            return await ticketModel.create({ code, amount,  purchaser});
           
        } catch (error) {
            console.error('Error al crear el ticket:', error);
     
        }
    }
}
export default new Ticket();