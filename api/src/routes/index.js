import express from "express";
const router = express.Router();
import {DB} from "src/assets/mock/db";

router.get("/products", (request, response) => {
    const data = DB.cards;
    console.log("\"/products\",");
    response.status(200);
    response.header("Access-Control-Allow-Origin", "*");
    response.json(data);
});

export  {router};