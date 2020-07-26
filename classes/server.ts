import { connectUser, disconnectUser, ticketsEvents } from './../sockets/sockets';
import { SERVER_PORT } from './../global/environment';
import express  from 'express';
import http from 'http';
import socketIO from 'socket.io';

export default class Server {

    private static _instance:Server;

    public app: express.Application;
    public port: number;
    public httpServer: http.Server;
    public io: socketIO.Server;

    constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.listenSocket();
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    listenSocket():void{
        console.log('Escuchando sockets');

        this.io.on('connection', (cliente:socketIO.Socket)=>{

            connectUser(cliente);

            disconnectUser(cliente);

            ticketsEvents(cliente, this.io);
        });
    }

    start(callback:Function){
        this.httpServer.listen(this.port, callback());
    }
}