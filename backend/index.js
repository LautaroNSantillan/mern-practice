import express from 'express';
import  {PORT, mongourl}  from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";

const app = express();

//middleware
app.use(express.json());

//routes
app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send("Welcome")
});

app.get('/books', async(req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

app.post('/newBook', async(req, res) => {
    try {
        if( !req.body.title || !req.body.author || !req.body.publishedYear)
        {return res.status(400).send({message: "All Fields Required"})}
        
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishedYear: req.body.publishedYear
        }

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message});
    }
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