import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {Categories} from "src/shared/constants";
import {pushProductNovelties} from "src/shared/state/products/actions";
import {Utils} from "src/shared/utils";
import {ProductCardWrapper} from "src/shared/components/ProductCardWrapper";
import {CardsContainer} from "./CardsContainer";


const CARDS_BATCH_SIZE = 4;
const NEXT_CARDS_BATCH_SIZE = 8;


export const Novelties = () => {
    const dispatch = useDispatch();
    const {products, noveltiesIsFetching} = useSelector(state => state.productsState);
    const noveltiesCards = Utils.Data.filterProductsByCategory(products, Categories.Novelties);

    React.useEffect(() => {
        if (!noveltiesCards.length && !noveltiesIsFetching)
            dispatch(pushProductNovelties(CARDS_BATCH_SIZE));
    }, [products]);


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