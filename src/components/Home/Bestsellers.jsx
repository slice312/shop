import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {pushProductsBestsellers} from "src/shared/state/products/actions";
import {ProductCardWrapper} from "src/shared/components/ProductCardWrapper";
import {CardsContainer} from "./CardsContainer";
import {Utils} from "src/shared/utils";
import {Categories} from "src/shared/constants";


const CARDS_BATCH_SIZE = 8;


export const Bestsellers = () => {
    const dispatch = useDispatch();
    const bestsellerCards = Utils.filterProductsByCategory(
        useSelector(state => state.productsState.products),
        Categories.Bestsellers
    );


    React.useEffect(() => {
        if (!bestsellerCards.length)
            dispatch(pushProductsBestsellers(CARDS_BATCH_SIZE));
    }, []);


    const loadMoreClick = () => {
        dispatch(pushProductsBestsellers(CARDS_BATCH_SIZE));
    };


    // TODO: вернуть
    return (
        <CardsContainer
            title="Хиты продаж"
            cards={bestsellerCards}
            onButtonLoadClick={loadMoreClick}
            CardElement={ProductCardWrapper}
        />
    );
};