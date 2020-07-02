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

router.post('/', async (req, res) => {
    try {
        const playlistItem = await sequelize.models.playlist_items.create(
            {
                playlist_id: req.body.playlist_id,
                title: req.body.title,
                category: req.body.category,
                url: req.body.url,
                is_complete: req.body.is_complete,
            }
        );
        return res.send(JSON.stringify(playlistItem));
    } catch (err) {
        return res.send(JSON.stringify(err));
    }
});

router.put('/:id', async (req, res) => {
    try {
        const playlistItem = await sequelize.models.playlist_items.findOne({
            where: {
                id: req.params.id
            }
        });

        console.log(playlistItem, 'ITEM')

        playlistItem.update(
            { 
                playlist_id: req.body.playlist_id,
                id: req.params.id,
                title: req.body.title,
                category: req.body.category,
                url: req.body.url,
                is_complete: req.body.is_complete,
            },
            { returning: true }
        );

        return res.send(JSON.stringify(playlistItem));
    } catch (err) {
        return res.send(JSON.stringify(err));
    }
});

export default router;