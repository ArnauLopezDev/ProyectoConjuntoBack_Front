const ticketModel = require('../models/tickets.model.js');

exports.getTickets = async (req, res) => {
    try {
        const tickets = await ticketModel.getAll();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tickets', error });
    }
};

exports.createTicket = async (req, res) => {
    const { fecha_compra, id_usuario, id_evento } = req.body;
    try {
        const newTicket = await ticketModel.create(fecha_compra, id_usuario, id_evento);
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el ticket', error });
    }
};

exports.getTicketById = async (req, res) => {
    try {
        const ticket = await ticketModel.getById(parseInt(req.params.id));
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el ticket', error });
    }
};

exports.updateTicket = async (req, res) => {
    const { fecha_compra, id_usuario, id_evento } = req.body;
    try {
        const success = await ticketModel.update(
            parseInt(req.params.id),
            fecha_compra,
            id_usuario,
            id_evento
        );
        if (!success) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }
        res.status(200).json({ message: 'Ticket actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el ticket', error });
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        const success = await ticketModel.delete(parseInt(req.params.id));
        if (!success) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el ticket', error });
    }
};
