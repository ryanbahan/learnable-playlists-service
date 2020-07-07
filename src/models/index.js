import Sequelize, { DataTypes } from 'sequelize';
import playlists from './playlists'
import playlistItems from './playlistItems'
import collections from './collections'

export const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.HOST,
        port: process.env.DB_PORT,
        logging: console.log,
        dialect: 'postgres',
        language: 'en'
    }
)

collections(sequelize, DataTypes)
playlists(sequelize, DataTypes)
playlistItems(sequelize, DataTypes)

sequelize.models.collections.hasMany(sequelize.models.playlists, {
    foreignKey: 'collection_id',
});

sequelize.models.playlists.hasMany(sequelize.models.playlist_items, {
    foreignKey: 'playlist_id',
});

Object.keys(sequelize.models).forEach(key => {
    if ('associate' in sequelize.models[key]) {
        sequelize.models[key].associate(sequelize.models);
    }
});