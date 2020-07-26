"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tickets = void 0;
class Tickets {
    constructor() {
        this.ticketsQueue = [];
        this.ticketsAttended = [];
    }
    getTickets() {
        return this.ticketsQueue;
    }
    getTicketsAttended() {
        return this.ticketsAttended;
    }
    getNextTicket(desk) {
        let ticket = this.ticketsQueue.shift();
        if (ticket != undefined) {
            ticket.desk = desk;
            ticket.attended = true;
            this.ticketsAttended.push(ticket);
            return ticket;
        }
    }
    addTicket(ticket) {
        this.ticketsQueue.push(ticket);
    }
    repetQueue(id) {
        for (const ticket of this.ticketsQueue) {
            if (ticket.id === id) {
                return true;
            }
        }
        return false;
    }
    repetAttended(id) {
        for (const ticket of this.ticketsAttended) {
            if (ticket.id === id) {
                return true;
            }
        }
        return false;
    }
    resetTicketsAttended() {
        this.ticketsAttended = [];
    }
    countTicketsAttended() {
        return this.ticketsAttended.length;
    }
}
exports.Tickets = Tickets;
