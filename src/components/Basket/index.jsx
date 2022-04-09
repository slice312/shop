import React from "react";
import {ProductsContainer} from "./ProductsContainer";
import {OrderInfo} from "./OrderInfo";
import css from "./styles.module.scss";


export const Basket = () => {
    return (
        <div className={css.root}>
            <div className={css.productContainer}>
                {/*<ProductsContainer/>*/}
            </div>
            <div className={css.orderInfo}>
                <OrderInfo/>
            </div>
        </div>
    );
};





