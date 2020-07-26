import { Ticket } from './../models/ticket.model';

export class Tickets {
  public ticketsQueue: Ticket[] = [];

  public ticketsAttended: Ticket[] = [];

  constructor() {}

  getTickets() {
    return this.ticketsQueue;
  }

  getTicketsAttended(){
    return this.ticketsAttended;
  }

  getNextTicket(desk:number) {
    let ticket: Ticket | undefined =  this.ticketsQueue.shift();

    if(ticket != undefined){
      ticket.desk = desk;
      ticket.attended = true;

      this.ticketsAttended.push(ticket);
      return ticket;
    }
  }

  addTicket(ticket: Ticket) {
    this.ticketsQueue.push(ticket);
  }

  repetQueue(id:number):boolean{
    for (const ticket of this.ticketsQueue) {
      if(ticket.id === id){
          return true;
      }
    }
    return false;
  }

  repetAttended(id:number):boolean{
    for (const ticket of this.ticketsAttended) {
      if(ticket.id === id){
          return true;
      }
    }
    return false;
  }

  resetTicketsAttended(){
      this.ticketsAttended = [];
  }

  countTicketsAttended(){
    return this.ticketsAttended.length;
  }
}
