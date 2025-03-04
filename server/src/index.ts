import 'dotenv/config'; // skrót do require('dotenv').config();
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { connectDB } from "./config/database";
import NoteRoutes from "./routes/NoteRoutes";

const app: Application = express();


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI || "";

connectDB(MONGO_URI);

app.use("/api/notes", NoteRoutes);

app.use("*", (req: Request, res: Response) => {
    res.status(404).json({message: 'Nie znaleziono żądanej ścieżki'})
})

app.listen(PORT, () => {
    console.log(`Serwer uruchomiony na porcie ${PORT}`);
})
