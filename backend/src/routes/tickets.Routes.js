const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/tickets.Controller');

// Rutas publicas
router.get('/', ticketsController.getTickets);
router.get('/:id', ticketsController.getTicketById);

// Rutas protegidas por rol de administrador
router.post('/', ticketsController.createTicket);
router.put('/:id', ticketsController.updateTicket);
router.delete('/:id', ticketsController.deleteTicket);

module.exports = router;