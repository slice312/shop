import http from "http";
import express from "express";
import moment from "moment";
import {DataRouter} from "./routes";
import logger from "morgan";
import cors from "cors";
import {middleware} from "./middleware";


const app = express();

app.use(express.urlencoded({extended: false}));
app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use(middleware.decodeToken);

app.use("/api", DataRouter);

// TODO use static

const server = http.createServer(app);
server.on("listening", () => {
    const timestamp = moment().format("HH:mm:ss DD.MM.YYYY");
    console.log(`Listening on port ${server.address().port}, ${timestamp}`);
});

server.listen(process.env.PORT || 8081);