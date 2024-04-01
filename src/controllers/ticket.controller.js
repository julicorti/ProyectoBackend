import { ticketModel } from "../../dao/models/ticket.model.js";
import ticketService from "../service/ticket.service.js";


class Ticket{
    async createTicket(req, res){
        try {
            const { code, dateTime, amount,  purchaser} = req.body;
            const newTicket = new ticketService({ code, dateTime, amount,  purchaser});
            const savedTicket = await newTicket.save();
            res.status(201).json(savedTicket);
        } catch (error) {
            console.error('Error al crear el ticket:', error);
            req.logger.error('Error al crear el ticket:', error);
            res.status(500).json({ message: 'Error al crear el ticket' });
        }
    }
    async getTicketById(req, res){
        try {
            const { ticketId } = req.params;
            const ticket = await ticketService.findById(ticketId);
            if (!ticket) {
                return res.status(404).json({ message: 'Ticket no encontrado' });
            }
            res.status(200).json(ticket);
        } catch (error) {
            req.logger.error('Error al obtener el ticket:', error);
            res.status(500).json({ message: 'Error al obtener el ticket' });
        }
    }

}
export default new Ticket();