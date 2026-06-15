import dotenv from 'dotenv';
import 'dotenv/config';
import app from './app.js';

dotenv.config({
    path: "./.env",
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})