import React from "react";
import lo from "lodash";
import {ProductCardWrapper} from "src/shared/components/ProductCardWrapper";
import css from "./styles.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {Utils} from "src/shared/utils";
import {Categories} from "src/shared/constants";
import {pushProductNovelties} from "src/shared/state/products/actions";


const PRODUCTS_LIMIT = 5;

export const Novelties = () => {
    const dispatch = useDispatch();
    const {products, noveltiesIsFetching} = useSelector(state => state.productsState);
    const noveltiesCards = Utils.Data.filterProductsByCategory(products, Categories.Novelties);

    console.log(noveltiesCards);
    React.useEffect(() => {
        if (!noveltiesCards.length && !noveltiesIsFetching)
            dispatch(pushProductNovelties(PRODUCTS_LIMIT));
    }, [noveltiesCards]);


    return (
        <div className={css.root}>
            <div className={css.title}>
                Новинки
            </div>
            <div className={css.cardContainer}>
                {
                    lo.take(noveltiesCards, PRODUCTS_LIMIT)
                        .map((x, i) => <ProductCardWrapper key={i} product={x.product}/>)
                }
            </div>
        </div>
    );
};