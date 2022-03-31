import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {pushCardsBestsellers, cardsBestSellersReset} from "src/shared/state/cards/actions";
import {ProductCard} from "src/shared/components/ProductCard";
import {CardsContainer} from "./CardsContainer";


const CARDS_BATCH_SIZE = 8;


export const Bestsellers = () => {
    const bestsellerCards = useSelector(state => state.cards.bestsellers);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!bestsellerCards?.length)
            dispatch(pushCardsBestsellers(CARDS_BATCH_SIZE));

        return () => void dispatch(cardsBestSellersReset());
    }, [dispatch]);


    const loadMoreClick = () => {
        dispatch(pushCardsBestsellers(CARDS_BATCH_SIZE));
    };


    return (
        <CardsContainer
            title="Хиты продаж"
            cards={bestsellerCards}
            onButtonLoadClick={loadMoreClick}
            CardElement={ProductCard}
        />
    );
};