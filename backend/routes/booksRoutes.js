import express from 'express';
import {Book} from '../models/bookModel.js';

const router = express.Router();

router.get('/', async(req, res) => {
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

router.get('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);

        return res.status(200).json(book);

    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.put('/:id', async(req, res)=>{
    try {
        if( !req.body.title && !req.body.author && !req.body.publishedYear)
            {return res.status(400).send({message: "At least one field required"})}
        
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return response.status(404).send({message: 'Book not found'});
        }

        const updatedBook = await Book.findById(id);
        return res.status(200).json(updatedBook);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.post('/newBook', async(req, res) => {
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

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({message: 'Book not found'});
        }

        return res.status(200).send({message: "Book deleted"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

export default router;