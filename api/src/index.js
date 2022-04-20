import http from "http";
import express from "express";
import moment from "moment";
import {router} from "./routes";


const app = express();

app.use("/api", router)

const server = http.createServer(app);

server.on("listening", () => {
    console.log(`Listening on port ${server.address().port}, ${moment().format("HH:mm:ss DD.MM.YYYY")}`);
});

server.listen(process.env.PORT || 8081);