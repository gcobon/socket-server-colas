import { SERVER_PORT } from './../global/enviroment';
import express from 'express';
import soketIO from 'socket.io';
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
    this.io = soketIO(this.httpServer);

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
      console.log('cliente conectado');

      //mensajes
      socket.message(cliente, this.io);

      //desconectar
      socket.disconnect(cliente);
    });
  }

  start(callback: Function) {
    this.httpServer.listen(this.port, callback());
  }
}
