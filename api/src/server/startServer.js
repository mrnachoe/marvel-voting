import express from 'express';
import bodyParser from "body-parser";
import cors from "cors"
import setupRoutes from "./routes";
import setupLogs from './log';

const app = express();
const PORT = 7000;

app.use(bodyParser.json());
app.use(
    cors({
        origin: (origin, cb) => cb(null, true),
        credentials: true
    })
);
setupLogs(app);
setupRoutes(app);

app.listen(PORT, () => {
    console.log(`API listening on ${PORT}`)
});