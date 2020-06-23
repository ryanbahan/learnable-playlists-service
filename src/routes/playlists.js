import { Router } from 'express';
import { sequelize } from '../models';

const router = Router();

router.get('/:id', async (req, res) => {
    const playlists = await sequelize.models.playlists.findAll();
    console.log(playlists[0].dataValues)
    return res.send(`${JSON.stringify(playlists[0].dataValues)}`);
});

export default router;