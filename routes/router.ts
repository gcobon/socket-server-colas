import { tickets } from './../sockets/sockets';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req:Request, res:Response)=>{
    res.json({
        status: 'Success',
        code: 200,
        message: 'API working'
    });
});

router.get('/tickets', (req:Request ,res: Response) => {
    res.json(tickets.getTickets());
});

router.get('/tickets-attended', (req:Request ,res: Response) => {
    res.json(tickets.getTicketsAttended());
});

export default router;
