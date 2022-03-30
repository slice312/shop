import React from "react";
import {useSelector, useDispatch} from "react-redux";
import css from "./styles.module.scss";
import {pushCardsNovelties, cardsNoveltiesReset} from "src/shared/state/cards/actions";
import {CardsView} from "src/shared/components/CardsView";


const COLLECTION_BATCH_SIZE = 4;


export const Collections = () => {
    const noveltiesCards = useSelector(state => state.cards.novelties);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!noveltiesCards?.length)
            dispatch(pushCardsNovelties(COLLECTION_BATCH_SIZE));

        return () => void dispatch(cardsNoveltiesReset());
    }, []);


    const loadMoreClick = () => {
        dispatch(pushCardsNovelties(CARDS_BATCH_SIZE));
    };

    return (
        <div className={css.root}>
            <div className={css.title}>
                <h2>Новинки</h2>
            </div>
            <CardsView cards={noveltiesCards}/>
            <div className={css.buttonDiv}>
                <button type="button" onClick={loadMoreClick}>Еще</button>
            </div>
        </div>
    );
};