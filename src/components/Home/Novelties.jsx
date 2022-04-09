import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {pushProductNovelties} from "src/shared/state/products/actions";
import {ProductCardWrapper} from "src/shared/components/ProductCardWrapper";
import {CardsContainer} from "./CardsContainer";
import {Utils} from "src/shared/utils";
import {Categories} from "src/shared/constants";


const CARDS_BATCH_SIZE = 4;
const NEXT_CARDS_BATCH_SIZE = 8;


export const Novelties = () => {
    const dispatch = useDispatch();
    const noveltiesCards = Utils.filterProductsByCategory(
        useSelector(state => state.productsState.products),
        Categories.Novelties
    );

    React.useEffect(() => {
        if (!noveltiesCards.length)
            dispatch(pushProductNovelties(CARDS_BATCH_SIZE));
    }, []);


    const loadMoreClick = () => {
        dispatch(pushProductNovelties(NEXT_CARDS_BATCH_SIZE));
    };


    return (
        <CardsContainer
            title="Новинки"
            cards={noveltiesCards}
            onButtonLoadClick={loadMoreClick}
            CardElement={ProductCardWrapper}
        />
    );
};