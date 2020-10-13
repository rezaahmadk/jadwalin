import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import router from './router.js';

const app = express();

//Connect to DB
const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        });

        console.log('Connect to DB Success');
    } catch (err) {
        console.log(err);
    }
}

connectDB();

//Middleware
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    res.json({
        message: 'success'
    })
});

const PORT = process.env.PORT || '3000';

app.use('/api', router);

app.listen(PORT, () => {
    console.log('App Listen to Port 3000');
});