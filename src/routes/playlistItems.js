import { Router } from 'express';

const router = Router();

router.get('/:id', (req, res) => {
    console.log(req.params)
    return res.send(`Received a GET HTTP method on ${req.params.id}`);
});

export default router;