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
            status: "active", 
            due_date: req.body.due_date,
        }
    );
    return res.send(JSON.stringify(playlist))
});

router.delete('/:playlist_id', async (req, res) => {

    try {
        sequelize.models.playlist_items.destroy({
            where: {
                playlist_id: req.params.playlist_id,
            }
        })

        sequelize.models.playlists.destroy({
            where: {
                id: req.params.playlist_id,
            }
        })

        return res.send(`Playlist ${req.params.playlist_id} successfully deleted`)
    } catch (err) {
        return res.send(JSON.stringify(err))
    }
});

router.patch('/:playlist_id', async (req, res) => {
    try {
        const playlist = await sequelize.models.playlists.findOne({
            where: {
                id: req.params.playlist_id
            }
        });

        playlist.update(
            req.body,
            { returning: true }
        );

        return res.send(JSON.stringify(playlist));
    } catch (err) {
        return res.send(JSON.stringify(err));
    }
});

export default router;