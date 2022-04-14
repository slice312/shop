import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {isMobile} from "react-device-detect";
import lo from "lodash";

import {pushProductNovelties} from "src/shared/state/products/actions";
import {Categories} from "src/shared/constants";
import {Utils} from "src/shared/utils";
import {ProductCardWrapper} from "src/shared/components/ProductCardWrapper";
import {MobileSlideCardsView} from "src/shared/components/MobileSlideCardsView";
import css from "./styles.module.scss";


const PRODUCTS_LIMIT = 5;


export const Novelties = () => {
    const dispatch = useDispatch();
    const {products, productsIsFetching} = useSelector(state => state.productsState);
    const noveltiesCards = Utils.Data.filterProductsByCategory(products, Categories.Novelties);

    React.useEffect(() => {
        if (!noveltiesCards.length && !productsIsFetching)
            dispatch(pushProductNovelties(PRODUCTS_LIMIT));
    }, [products, productsIsFetching]);

    const novelties = lo.take(noveltiesCards, PRODUCTS_LIMIT);


    return (
        <div className={css.root}>
            <div className={css.title}>
                Новинки
            </div>
            {
                isMobile
                    ? (<MobileSlideCardsView
                            className={css.mobileCardContainer}
                            products={novelties}
                            CardElement={ProductCardWrapper}
                            chunkSize={5}
                        />
                    )
                    : (
                        <div className={css.cardContainer}>
                            {
                                novelties.map((x, i) => <ProductCardWrapper key={i} product={x.product}/>)
                            }
                        </div>
                    )
            }
        </div>
    );
};