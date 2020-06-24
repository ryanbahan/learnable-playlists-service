import { Router } from 'express';
import { sequelize } from '../models';

const router = Router();

router.get('/:user_id', async (req, res) => {
    const playlists = {
        data: await sequelize.models.playlists.findAll({
            where: {
                user_id: req.params.user_id
            },
            include: sequelize.models.playlist_items
        })
    };

    if (playlists.data.length) {
        return res.send(JSON.stringify(playlists))
    } else {
        return res.send("Nothing matched your query")
    }
});

router.post('/:user_id', async (req, res) => {
    const playlist = await sequelize.models.playlists.create(
        { 
            user_id: req.body.user_id, 
            title: req.body.title, 
            status: req.body.status, 
            due_date: req.body.due_date,
        }
    );
    return res.send(JSON.stringify(playlist))
});

export default router;