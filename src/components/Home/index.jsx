import React from "react";
import {Slider} from "./Slider";
import {Bestsellers} from "./Bestsellers";
import {Novelties} from "./Novelties";
import {Collections} from "./Collections";
import {Advantages} from "./Advantages";
import {FloatButtons} from "src/shared/components/FloatButtons";


export const Home = () => {
    console.log("Home render");

    return (
        <div>
            <FloatButtons/>
            <Slider/>
            <Bestsellers/>
            <Novelties/>
            <Collections/>
            <Advantages/>
        </div>
    );
};