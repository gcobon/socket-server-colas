"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sockets_1 = require("./../sockets/sockets");
const environment_1 = require("./../global/environment");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        this.listenSocket();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    listenSocket() {
        console.log('Escuchando sockets');
        this.io.on('connection', (cliente) => {
            sockets_1.connectUser(cliente);
            sockets_1.disconnectUser(cliente);
            sockets_1.ticketsEvents(cliente, this.io);
        });
    }
    start(callback) {
        this.httpServer.listen(this.port, callback());
    }
}
exports.default = Server;
