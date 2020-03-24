import express from 'express';
import bodyParser from "body-parser";
import authChecker from "./authChecker"
import cors from "cors"
import setupRoutes from "./routes";

const app = express();
app.use(bodyParser.json());

app.use(
    cors({
        origin: (origin, cb) => cb(null, true),
        credentials: true
    })
);

setupRoutes(app);

app.listen(7000, () => {
    console.log("API listening on 7000")
})