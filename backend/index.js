import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import router from './routes/route.js'
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(cors());
//app.options('*', cors()) // enable CORS for all routes

/* app.use(cors({
    origin: 'http://localhost:8000',
    methods:['POST', 'GET', 'PUT', 'DELETE'],
    allowedHeaders: ['content-type']

})) */


app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', router);

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);
const PORT = 8000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


