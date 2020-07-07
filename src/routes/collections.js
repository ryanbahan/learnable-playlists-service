import { Router } from 'express';
import { sequelize } from '../models';

const router = Router();

router.get('/:user_id', async (req, res) => {
    const collections = {
        data: await sequelize.models.collections.findAll({
            where: {
                user_id: req.params.user_id
            },
        })
    };

    if (collections.data.length) {
        return res.send(JSON.stringify(collections))
    } else {
        return res.send("Nothing matched your query")
    }
});

router.post('/:user_id', async (req, res) => {
    const collection = await sequelize.models.collections.create(
        {
            user_id: req.params.user_id,
            title: req.body.title,
            status: "active",
        }
    );
    
    return res.send(JSON.stringify(collection))
});

// router.delete('/:playlist_id', async (req, res) => {

//     try {
//         sequelize.models.playlist_items.destroy({
//             where: {
//                 playlist_id: req.params.playlist_id,
//             }
//         })

//         sequelize.models.playlists.destroy({
//             where: {
//                 id: req.params.playlist_id,
//             }
//         })

//         return res.send(`Playlist ${req.params.playlist_id} successfully deleted`)
//     } catch (err) {
//         return res.send(JSON.stringify(err))
//     }
// });

// router.patch('/:playlist_id', async (req, res) => {
//     try {
//         const playlist = await sequelize.models.playlists.findOne({
//             where: {
//                 id: req.params.playlist_id
//             }
//         });

//         playlist.update(
//             req.body,
//             { returning: true }
//         );

//         return res.send(JSON.stringify(playlist));
//     } catch (err) {
//         return res.send(JSON.stringify(err));
//     }
// });

export default router;