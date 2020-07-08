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

router.delete('/:collection_id', async (req, res) => {
    try {
        console.log("before")
        const playlist = {
            data: await sequelize.models.playlists.findOne({
                where: {
                    collection_id: req.params.collection_id
                },
            })
        };

        if (playlist.data) {
            const playlistID = playlist.data.dataValues.id

            await sequelize.models.playlist_items.destroy({
                where: {
                    playlist_id: playlistID,
                }
            })

            await sequelize.models.playlists.destroy({
                where: {
                    collection_id: req.params.collection_id,
                }
            })
        }

        await sequelize.models.collections.destroy({
            where: {
                id: req.params.collection_id,
            }
        })

        return res.send(`Collection ${req.params.collection_id} successfully deleted`)
    } catch (err) {
        return res.send(JSON.stringify(err))
    }
});

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