import { Router } from 'express';
import { sequelize } from '../models';

const router = Router();

router.get('/:id', async (req, res) => {
    const playlistItems = await sequelize.models.playlist_items.findAll({
        where: {
            id: req.params.id
        }
    });

    if (playlistItems.length) {
        return res.send(JSON.stringify(playlistItems))
    } else {
        return res.send("Nothing matched your query")
    }
});

export default router;