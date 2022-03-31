import React from "react";
import {Slider} from "./Slider";
import {Bestsellers} from "./Bestsellers";
import {Novelties} from "./Novelties";
import {Collections} from "./Collections";
import css from "./Home.module.scss";


export const Home = () => {
    console.log("Home render");

    // TODO: с тремя блоками  Bestsellers, Novelties, Collections надло что-то сделать
    // там стили дублируются
    return (
        <div>
            <Slider/>

            <Bestsellers/>
            <Novelties/>
            <Collections/>
        </div>
    );
};