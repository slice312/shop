import React from "react";
import {ProductsContainer} from "./ProductsContainer";
import {Info} from "./Info";
import css from "./styles.module.scss";


export const Basket = () => {
    return (
        <div className={css.root}>
            <div className={css.productContainer}>
                <ProductsContainer/>
            </div>
            <div className={css.orderInfo}>
                <Info/>
            </div>
        </div>
    );
};





