import express from 'express';
import fs from "fs";
import bodyParser from 'body-parser';
import { initializeApp } from 'firebase/app';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDsQFskEYflk1gBAwlo5VFBVcg5Y6BMOmw",
  authDomain: "libros-28718.firebaseapp.com",
  projectId: "libros-28718",
  storageBucket: "libros-28718.appspot.com",
  messagingSenderId: "865408137427",
  appId: "1:865408137427:web:2d0b7682fa7bdae9d6fc26"
});

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
    const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
    } catch (error) {
    console.log(error);
    }
};

const writeData = (data) => {
try {
    fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
    console.log(error);
    }
};

app.get("/", (req, res) => {
    res.send("welcome to my API with Node js!");
});

app.get("/books", (req, res) => {
const data = readData();
res.json(data.books);
});

app.get("/books/:id", (req, res) => {
const data = readData();
const id = parseInt(req.params.id);
const book = data.books.find((book) => book.id === id);
res.json(book);
});

app.post("/books", (req, res) => {
    const data = readData();
    const body = req.body;
    const newBook = {
        id: data.books.length + 1,
        ...body,
    };
    data.books.push(newBook);
    writeData(data);
    res.json(newBook);
});

app.put("/books/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books[bookIndex] = {
        ...data.books[bookIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Book update successfully" });
});

app.delete("/books/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books.splice(bookIndex, 1);
    writeData(data);
    res.json({ message: "Book deleted successfully"})
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
