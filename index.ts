import router from './routes/router';
import Server from "./classes/server";
import cors from 'cors';
import express from 'express';

const server = new Server();

//server
server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});

//middlewares
// server.app.use(bodyParser.urlencoded({extended: true}));
// server.app.use(bodyParser.json());
 server.app.use(express.json());
 server.app.use(express.urlencoded({extended: true}));

//cors
server.app.use(cors({origin: true, credentials: true}));
//routes
server.app.use('/', router);
