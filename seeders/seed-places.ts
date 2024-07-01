import { Place } from '../models/index';

import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const MONGO_URI: string = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Success!');
    })
    .catch((err: Error) => {
        console.log('Failure!', err);
    });

const places: Place[] = [
    {
        name: 'H-Thai-ML',
        city: 'Seattle',
        state: 'WA',
        cuisines: 'Thai, Pan-Asian',
        pic: '/images/h-thai-ml-tables.jpg',
        founded: 1989
    },
    {
        name: 'Coding Cat Cafe',
        city: 'Phoenix',
        state: 'AZ',
        cuisines: 'Coffee, Bakery',
        pic: '/images/coffee-cat.jpg',
        founded: 2020
    }
];

Place.create(places)
    .then(() => {
        console.log('Success!');
        process.exit();
    })
    .catch((err: Error) => {
        console.log('Failure!', err);
        process.exit();
    });