"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketsEvents = exports.disconnectUser = exports.connectUser = exports.tickets = void 0;
const tickets_1 = require("./../classes/tickets");
exports.tickets = new tickets_1.Tickets();
exports.connectUser = (client) => {
    console.log(`Usuario ${client.id} conectado`);
};
exports.disconnectUser = (client) => {
    client.on('disconnect', () => {
        console.log(`Usuario ${client.id} desconectado`);
    });
};
exports.ticketsEvents = (client, io) => {
    client.on('ticket-new', () => {
        let number = Math.floor(Math.random() * (1000 - 1) + 1);
        if (exports.tickets.countTicketsAttended() >= 999) {
            exports.tickets.resetTicketsAttended();
        }
        while (!exports.tickets.repetQueue(number) && !exports.tickets.repetAttended(number)) {
            let newTicket = {
                id: number,
                ticket: `S-${number}`,
                attended: false,
            };
            exports.tickets.addTicket(newTicket);
            io.to(client.id).emit('ticket-new', newTicket);
        }
    });
    client.on('ticket-next', (desk) => {
        let nextTicket = exports.tickets.getNextTicket(desk);
        io.to(client.id).emit('ticket-next', nextTicket);
        io.emit('ticket-public', nextTicket);
    });
};
