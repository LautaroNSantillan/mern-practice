import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoutes.js';


dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use('/books', booksRoute); // for /books requests handle them with booksRoute middleware

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send("Welcome")
});

function startApp(app){
    app.listen(process.env.PORT, (err, res) =>{
        console.log(`app on ${process.env.PORT}`)
    });
}

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("con to db");
        startApp(app);
    })
    .catch(err =>{
        console.log(err)
    });