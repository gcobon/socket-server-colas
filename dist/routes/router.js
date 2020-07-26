"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sockets_1 = require("./../sockets/sockets");
const express_1 = require("express");
const router = express_1.Router();
router.get('/', (req, res) => {
    res.json({
        status: 'Success',
        code: 200,
        message: 'API working'
    });
});
router.get('/tickets', (req, res) => {
    res.json(sockets_1.tickets.getTickets());
});
router.get('/tickets-attended', (req, res) => {
    res.json(sockets_1.tickets.getTicketsAttended());
});
exports.default = router;
