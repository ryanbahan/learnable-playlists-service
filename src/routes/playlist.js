import { Router } from 'express';

const router = Router();

router.get('/:id', (req, res) => {
    return res.send('Received a GET HTTP method');
});

export default router;