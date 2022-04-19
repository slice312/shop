import * as url from "url";
import http from "http";
import express from "express";

import fallback from "express-history-api-fallback";
import compression from "compression";
import moment from "moment";


const app = express();

app.use(compression());
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
app.use(express.static(`${__dirname}/spa/build`));
app.use(fallback(`${__dirname}/build/index.html`));

const server = http.createServer(app);

server.on("listening", () => {
    const addr = server.address()   ;
    console.log(`Listening on port ${addr.port}, ${moment().format("HH:mm:ss DD.MM.YYYY")}`);
});

server.listen(process.env.PORT || 3001);