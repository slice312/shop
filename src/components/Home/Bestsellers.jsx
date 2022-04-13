import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {Categories} from "src/shared/constants";
import {pushProductsBestsellers} from "src/shared/state/products/actions";
import {Utils} from "src/shared/utils";
import {ProductCardWrapper} from "src/shared/components/ProductCardWrapper";
import {CardsContainer} from "./CardsContainer";


const CARDS_BATCH_SIZE = 8;


export const Bestsellers = () => {
    const dispatch = useDispatch();
    const {products, bestSellersIsFetching} = useSelector(state => state.productsState);
    const bestsellerCards = Utils.Data.filterProductsByCategory(products, Categories.Bestsellers);

    React.useEffect(() => {
        if (!bestsellerCards.length && !bestSellersIsFetching)
            dispatch(pushProductsBestsellers(CARDS_BATCH_SIZE));
    }, [products]);


    const loadMoreClick = () => {
        dispatch(pushProductsBestsellers(CARDS_BATCH_SIZE));
    };


    return (
        <CardsContainer
            title="Хиты продаж"
            cards={bestsellerCards}
            onButtonLoadClick={loadMoreClick}
            CardElement={ProductCardWrapper}
        />
    );
};