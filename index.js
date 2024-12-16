import fs from "fs";
import bodyParser from 'body-parser';
import { initializeApp } from 'firebase/app';
import express from 'express';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyADfRBkbYfnboFknALykoUn1L77biMDO1A",
    authDomain: "book-10924.firebaseapp.com",
    projectId: "book-10924",
    storageBucket: "book-10924.appspot.com",
    messagingSenderId: "927180943283",
    appId: "1:927180943283:web:2ce9f4e79d76920daee5c6"
};

const app = express();
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
app.use(bodyParser.json());

// Funciones para leer y escribir datos
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

// Rutas de la API
app.get("/", (req, res) => {
    res.send("Welcome to my API with Node.js!");
});

// Otras rutas...

app.listen(3000, () => {
    console.log("Server listening on port 3000");
    testConnection();
});

// Función para probar la conexión a Firestore
async function testConnection() {
    try {
        const snapshot = await getDocs(collection(db, 'users'));
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
        });
    } catch (error) {
        console.error("Error fetching documents: ", error);
    }
}
