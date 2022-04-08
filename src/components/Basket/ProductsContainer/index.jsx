import React from "react";
import {BasketItem} from "./BasketItem";
import css from "./styles.module.scss";
import {DB} from "src/assets/mock/db";


export const ProductsContainer = () => {
    return (
        <div className={css.root}>
            {
                DB.cards.map((x, i) => {
                    return (
                        <BasketItem key={i}
                              title={x.title}
                              image={(x.images?.length) ? x.images[0] : null}
                              size={x.size}
                              price={x.price}
                              discount={x.discount}
                        />
                    );
                })
            }
        </div>
    );
};