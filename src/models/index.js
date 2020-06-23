import Sequelize, { DataTypes } from 'sequelize';
import playlist from './playlist'
import playlistItem from './playlistItem'

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

playlist(sequelize, DataTypes)
playlistItem(sequelize, DataTypes)

// Object.keys(models).forEach(key => {
//     if ('associate' in models[key]) {
//         models[key].associate(models);
//     }
// });

// export default models;