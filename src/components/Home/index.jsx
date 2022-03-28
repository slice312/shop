import React from "react";
import {Slider} from "./Slider";
import css from "./Home.module.scss";
import {Bestsellers} from "./Bestsellers";


export const Home = () => {
    console.log("Home render");

    return (
        <div>
            <Slider/>
            <Bestsellers/>
        </div>
    );
};