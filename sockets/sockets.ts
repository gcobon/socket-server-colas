import { Tickets } from './../classes/tickets';
import { Ticket } from './../models/ticket.model';
import { Socket } from 'socket.io';

export const tickets = new Tickets();

export const connectUser = (client: Socket) => {
  console.log(`Usuario ${client.id} conectado`);
};

export const disconnectUser = (client: Socket) => {
  client.on('disconnect', () => {
    console.log(`Usuario ${client.id} desconectado`);
  });
};

export const ticketsEvents = (client: Socket, io: SocketIO.Server) => {
  client.on('ticket-new', () => {
    let number = Math.floor(Math.random() * (1000 - 1) + 1);

    if (tickets.countTicketsAttended() >= 999) {
      tickets.resetTicketsAttended();
    }

    while (!tickets.repetQueue(number) && !tickets.repetAttended(number)) {
      let newTicket: Ticket = {
        id: number,
        ticket: `S-${number}`,
        attended: false,
      };

      tickets.addTicket(newTicket);

      io.to(client.id).emit('ticket-new', newTicket);
    }
  });

  client.on('ticket-next', (desk: number) => {
    let nextTicket = tickets.getNextTicket(desk);

    io.to(client.id).emit('ticket-next', nextTicket);
    io.emit('ticket-public', nextTicket);
  });
};
