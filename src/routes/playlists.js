import { Router } from 'express';
import { sequelize } from '../models';

const router = Router();

router.get('/:id', async (req, res) => {
    const playlists = await sequelize.models.playlists.findAll({
        where: {
            user_id: req.params.id
        }
    });

    if (playlists.length) {
        return res.send(JSON.stringify(playlists))
    } else {
        return res.send("Nothing matched your query")
    }
});

export default router;