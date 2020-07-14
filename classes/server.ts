import { SERVER_PORT } from './../global/enviroment';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from './../sockets/sockets';

/**
 * Se aplica el patron singleton para poder crear solo una instancia
 * del socket
 */
export default class Server {
  //propiedad de singleton
  private static _instance: Server;

  //express
  public app: express.Application;
  public port: number;
  //http
  public httpServer: http.Server;
  //socker
  public io: SocketIO.Server;

  private constructor() {
    //express
    this.app = express();
    this.port = SERVER_PORT;

    //http
    this.httpServer = new http.Server(this.app);

    //socker
    this.io = socketIO(this.httpServer);

    this.listenSocket();
  }

  /** metodo get para obtener la instania del servidor, si la instancia
   * existe la devuele sino la crea
   */
  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  //escuchar los eventos del socket
  private listenSocket() {
    console.log('Escuchando conexiones - sockets');

    this.io.on('connection', (cliente) => {
     
      //conectar cliente
      socket.connectUser(cliente);

      //config user
      socket.configUser(cliente,  this.io);
      
      //mensajes
      socket.message(cliente, this.io);

      //obtener usuarios activos
      socket.getUsers(cliente, this.io);

      //desconectar
      socket.disconnect(cliente, this.io);

    });
  }

  start(callback: Function) {
    this.httpServer.listen(this.port, callback());
  }
}
