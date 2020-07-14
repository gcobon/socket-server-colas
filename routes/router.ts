import { usersConnected } from './../sockets/sockets';
import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/mensaje', (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: 'Mensaje desde la api',
  });
});

router.post('/mensaje', (req: Request, res: Response) => {
  const data = req.body;

  const payload = {
    de: data.de,
    cuerpo: data.cuerpo,
  };

  const server = Server.instance;
  server.io.emit('nuevo-mensaje', payload);

  res.json({
    ok: true,
    message: 'POST-Mensaje desde la api',
    data: data,
  });
});

router.post('/mensaje/:id', (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params.id;
  const payload = {
    de: data.de,
    cuerpo: data.cuerpo,
  };

  const server = Server.instance;
  server.io.in(id).emit('mensaje-privado', payload);

  res.send({
    ok: true,
    message: 'POST-Mensaje desde la api',
    data,
    id,
  });
});

/**
 * ruta para obtener todos los id de los usuarios
 */

router.get('/users', (req: Request, res: Response) => {
  const server = Server.instance;

  server.io.clients((err: any, clients: string[]) => {
    if (err) {
      return res.json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      clients,
    });
  });
});

/**
 * obtener usuarios y sus nombres
 */

router.get('/users/detail', (req: Request, res: Response) => {

    res.json({
        ok: true,
        clients: usersConnected.getList()
    });

});



export default router;
