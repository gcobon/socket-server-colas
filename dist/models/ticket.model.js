"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
class Ticket {
    constructor(id, ticket, attended, desk) {
        this.id = id;
        this.ticket = ticket;
        this.attended = attended;
        this.desk = desk;
    }
}
exports.Ticket = Ticket;
