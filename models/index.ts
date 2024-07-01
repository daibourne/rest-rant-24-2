import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const MONGO_URI: string = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err: Error) => {
        console.log(err);
    });

export const Place = require('./places');
export const Comment = require('./comment');