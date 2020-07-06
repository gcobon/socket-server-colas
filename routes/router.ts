import { Router, Request, Response} from 'express';


const router = Router();

router.get('/mensaje', (req:Request, res: Response )=>{

    res.json({
        ok: true,
        message: 'Mensaje desde la api'
    });
});

router.post('/mensaje', (req:Request, res: Response )=>{

    let data = req.body;

    res.json({
        ok: true,
        message: 'POST-Mensaje desde la api',
        data: data
    });
});

router.post('/mensaje/:id', (req:Request, res: Response )=>{

    const data = req.body;
    const id = req.params.id; 

    res.send({
        ok: true,
        message: 'POST-Mensaje desde la api',
        data,
        id
    });
});


export default router;

