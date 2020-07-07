import {Socket}  from 'socket.io';
import SocketIO  from 'socket.io';

export const disconnect = (cliente: Socket) => {
  cliente.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
};

//escuchar mensajes
export const message = (cliente: Socket, io:SocketIO.Server) => {

    cliente.on('mensaje', (payload: {de:string, cuerpo: string})=> {
        console.log('Mensaje recibido', payload);

        io.emit('nuevo-mensaje', payload);
    });
};
