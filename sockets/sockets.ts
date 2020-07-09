import { UserList } from './../classes/user-list';
import {Socket}  from 'socket.io';
import SocketIO  from 'socket.io';
import { User } from '../classes/user';

export const usersConnected = new UserList();

export const connectUser = (cliente: Socket) => {

  const user = new User(cliente.id);
  usersConnected.addUser(user);
}

//desconectar 
export const disconnect = (cliente: Socket) => {
  cliente.on('disconnect', () => {
    
    const user = usersConnected.deleteUser(cliente.id);

    console.log(`Cliente ${user?.id} desconectado`);
  });
};

//escuchar mensajes
export const message = (cliente: Socket, io:SocketIO.Server) => {

    cliente.on('mensaje', (payload: {de:string, cuerpo: string})=> {
        console.log('Mensaje recibido', payload);

        io.emit('nuevo-mensaje', payload);
    });
};

//config user
export const configUser = (cliente: Socket) => {
    cliente.on('configurar-usuario', (payload: {nombre:string}, callback:Function)=>{
      
      usersConnected.updateName(cliente.id, payload.nombre);

      callback({
        ok: true,
        message: `Usuario ${payload.nombre}, configurado`
      });
    })
}
