import express from 'express'
import cors from 'cors'
import axios from 'axios'
import session from 'express-session'
const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.get('/', (req, res) => {
    res.json({message: "working just fine"});
});

import spotifyRouter from './routes/spotifyRoutes.js';
import downloadRouter from './routes/songDownloadRoutes.js'

app.use('/', spotifyRouter);
app.use('/', downloadRouter);

export default app;