import React from "react";
import {ProductCardWrapper} from "src/shared/components/ProductCardWrapper";
import css from "./styles.module.scss";


// TODO: props
export const SimilarProducts = ({products}) => {

    return (
        <div className={css.root}>
            <div className={css.title}>
                Похожие товары
            </div>
            <div className={css.cardContainer}>
                {
                    products.map((x, i) => <ProductCardWrapper key={i} product={x.product}/>)
                }
            </div>
        </div>
    );
};