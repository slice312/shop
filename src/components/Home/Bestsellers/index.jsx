import React from "react";
import {useSelector, useDispatch} from "react-redux";
import css from "./styles.module.scss";
import {pushCardsBestsellers, cardsBestSellersReset} from "src/shared/state/cards/actions";
import {CardsView} from "src/shared/components/CardsView";


const CARDS_BATCH_SIZE = 8;


export const Bestsellers = () => {
    const bestsellerCards = useSelector(state => state.cards.bestsellers);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!bestsellerCards?.length)
            dispatch(pushCardsBestsellers(CARDS_BATCH_SIZE));

        return () => void dispatch(cardsBestSellersReset());
    }, []);


    const loadMoreClick = () => {
        dispatch(pushCardsBestsellers(CARDS_BATCH_SIZE));
    };

    return (
        <div className={css.root}>
            <div className={css.title}>
                <h2>Хиты продаж</h2>
            </div>
            <CardsView cards={bestsellerCards}/>
            <div className={css.buttonDiv}>
                <button type="button" onClick={loadMoreClick}>Еще</button>
            </div>
        </div>
    );
};