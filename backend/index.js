import express from 'express';
import  {PORT, mongourl}  from "./config.js";
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoutes.js';

const app = express();

//middleware
app.use(express.json());
app.use('/books', booksRoute); // for /books requests handle them with booksRoute middleware

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send("Welcome")
});

function startApp(app){
    app.listen(PORT, (err, res) =>{
        console.log(`app on ${PORT}`)
    });
}

mongoose.connect(mongourl)
    .then(()=>{
        console.log("con to db");
        startApp(app);
    })
    .catch(err =>{
        console.log(err)
    });