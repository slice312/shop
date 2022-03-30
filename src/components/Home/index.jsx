import React from "react";
import {Slider} from "./Slider";
import {Bestsellers} from "./Bestsellers";
import {Novelties} from "./Novelties";
import css from "./Home.module.scss";


export const Home = () => {
    console.log("Home render");
    return (
        <div>
            <Slider/>
            <Bestsellers/>
            <Novelties/>
        </div>
    );
};