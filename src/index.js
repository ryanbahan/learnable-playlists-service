import 'dotenv/config';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import routes from './routes';
import models, { sequelize } from './models';
import playlist from './models/playlist';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.context = sequelize.models;
    next();
});

app.use('/playlist', routes.playlist);
app.use('/playlistItem', routes.playlistItem);

app.get('/', async (req, res) => {
    console.log('t', models.Playlist.create)
    return res.send(`${JSON.stringify(models)}`);
});

async function testDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testDB()

// app.post('/', (req, res) => {
//     return res.send('Received a POST HTTP method');
// });

// app.post('/messages', (req, res) => {
//     const id = uuidv4();
//     const message = {
//         id,
//         text: req.body.text,
//     };

//     messages[id] = message;

//     return res.send(message);
// });

// app.put('/', (req, res) => {
//     return res.send('Received a PUT HTTP method');
// });

// app.delete('/', (req, res) => {
//     return res.send('Received a DELETE HTTP method');
// });

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () =>
        console.log('Example app listening on port 3000!'),
    );
});