const exprss = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = exprss();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Yuto8181nmb",
    database: "day_4_9_db",
})

app.use(exprss.json());
app.use(cors());

app.listen(8800, () => {
    console.log('connected to backend!!')
})

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/books', (req, res) => {
    const q = 'SELECT * FROM books';
    db.query(q, (err, results) => {
        if(err) return res.json(err);
        return res.json(results);
    })
})

app.post('/books', (req, res) => {
    const q = 'INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)';
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ];

    db.query(q, [values], (err, results) => {
        if(err) res.json(err);
        return res.json('book has been created successfully!!');
    })
})

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const q = 'DELETE FROM books WHERE id = ?'

    db.query(q, [bookId], (err, results) => {
        if(err) return res.json(err);
        return res.json('book has been deleted successfully')
    })
})

app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const q = 'UPDATE books SET `title` = ?, `desc` = ?, `cover` = ? WHERE id = ?'

    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ];

    db.query(q, [...values, bookId], (err, results) => {
        if(err) return res.json(err);
        return res.json('book has been deleted successfully')
    })
})

