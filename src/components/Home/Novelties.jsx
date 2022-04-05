import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {pushCardsNovelties, cardsNoveltiesReset} from "src/shared/state/products/actions";
import {ProductCard} from "src/shared/components/ProductCard";
import {CardsContainer} from "./CardsContainer";


const CARDS_BATCH_SIZE = 4;
const NEXT_CARDS_BATCH_SIZE = 8;


export const Novelties = () => {
    const noveltiesCards = useSelector(state => state.products.novelties);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!noveltiesCards?.length)
            dispatch(pushCardsNovelties(CARDS_BATCH_SIZE));

        return () => void dispatch(cardsNoveltiesReset());
    }, [dispatch]);


    const loadMoreClick = () => {
        dispatch(pushCardsNovelties(NEXT_CARDS_BATCH_SIZE));
    };


    return (
        <CardsContainer
            title="Новинки"
            cards={noveltiesCards}
            onButtonLoadClick={loadMoreClick}
            CardElement={ProductCard}
        />
    );
};