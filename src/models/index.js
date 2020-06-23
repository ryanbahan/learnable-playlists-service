import Sequelize, { DataTypes } from 'sequelize';
import playlist from './playlist'

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

// Object.keys(models).forEach(key => {
//     if ('associate' in models[key]) {
//         models[key].associate(models);
//     }
// });

console.log('hi', sequelize.models)

// export default models;