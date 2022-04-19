import React from "react";
import {useDispatch} from "react-redux";

import {productsReset} from "src/shared/state/products/actions";
import {Slider} from "./Slider";
import {Bestsellers} from "./Bestsellers";
import {Novelties} from "./Novelties";
import {Collections} from "./Collections";
import {Advantages} from "./Advantages";
import css from "./styles.module.scss";


export const Home = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(productsReset());
    }, []);


    return (
        <div className={css.root}>
            <Slider/>
            <Bestsellers/>
            <Novelties/>
            <Collections/>
            <Advantages/>
        </div>
    );
};