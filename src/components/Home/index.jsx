import React from "react";
import {Slider} from "./Slider";
import {Bestsellers} from "./Bestsellers";
import {Novelties} from "./Novelties";
import {Collections} from "./Collections";
import {Advantages} from "./Advantages";

import {productsReset} from "src/shared/state/products/actions";
import {useDispatch} from "react-redux";


export const Home = () => {
    console.log("Home render");

    const dispatch = useDispatch();
    React.useEffect(() => () => void dispatch(productsReset()), []);

    return (
        <div>
            <Slider/>
            <Bestsellers/>
            <Novelties/>
            <Collections/>
            <Advantages/>
        </div>
    );
};