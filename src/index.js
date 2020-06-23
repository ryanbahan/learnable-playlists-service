import 'dotenv/config';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import routes from './routes';
import { sequelize } from './models';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.context = sequelize.models;
    next();
});

app.use('/playlists', routes.playlists);
app.use('/playlistItems', routes.playlistItems);

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () =>
        console.log('Example app listening on port 3000!'),
    );
});