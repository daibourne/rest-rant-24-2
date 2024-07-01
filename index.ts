import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response } from 'express';
import render from './render';
import methodOverride from 'method-override';
import mongoose from 'mongoose';

const app: Express = express();
const PORT: string | number = process.env.PORT;
const MONGO_URI: string = process.env.MONGO_URI;
console.log(PORT);

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to mongo: ' + MONGO_URI);
    })
    .catch((err: Error) => {
        console.log('Error connecting to mongo: ' + err);
    });

// MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req: Request, res: Response) => {
    res.send(render('Home'));
});

// Load the places controller
app.use('/places', require('./controllers/places'));

app.use(express.urlencoded({ extended: true }));

// Wildcard/404 route
app.get('*', (req: Request, res: Response) => {
    console.log('user requested unknown route: ', req.url);
    res.status(404).send(render('Error404'));
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});