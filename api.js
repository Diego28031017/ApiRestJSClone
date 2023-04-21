const express = require('express');
const app = express();
const port = 3000;

let books = [
    {
        'id': 1,
        'title': 'La hojarasca',
        'description': 'Good one',
        'author': 'Gabo'
    },
    {
        'id': 2,
        'title': 'El coronel no tiene quien le escriba',
        'description': 'Interesting',
        'author': 'Gabo'
    }
];

app.use(express.json());

// Obtener todos libros
app.get('/books', (req, res) => {
    res.json({ books: books });
});

// Obtener un libro segun el ID
app.get('/books/:book_id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.book_id));
    if (!book) {
        return res.status(404).send('Book not found');
    }
    res.json({ book: book });
});

// Agregar un nuevo libro
app.post('/books', (req, res) => {
    if (!req.body.title) {
        return res.status(400).send('Title is required');
    }
    const book = {
        id: books.length + 1,
        title: req.body.title,
        description: req.body.description || '',
        author: req.body.author || ''
    };
    books.push(book);
    res.status(201).json({ book: book });
});

// Editar un libro
app.put('/books/:book_id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.book_id));
    if (!book || !req.body) {
        return res.status(404).send('Book not found');
    }
    book.title = req.body.title || book.title;
    book.description = req.body.description || book.description;
    book.author = req.body.author || book.author;
    res.json({ book: book });
});

// Eliminar un libro 
app.delete('/books/:book_id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.book_id));
    if (!book) {
        return res.status(404).send('Book not found');
    }
    books = books.filter(b => b.id !== parseInt(req.params.book_id));
    res.json({ result: true });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
