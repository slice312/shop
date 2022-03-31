import React from "react";
import {CardsView} from "src/shared/components/CardsView";
import css from "./styles.module.scss";


export const CardsContainer = (
    {
        title,
        cards,
        onButtonLoadClick,
        CardElement
    }) => {

    return (
        <div className={css.root}>
            <div className={css.title}>
                <h2>{title}</h2>
            </div>
            <CardsView cards={cards} CardElement={CardElement}/>
            <div className={css.buttonDiv}>
                <button type="button" onClick={onButtonLoadClick}>Еще</button>
            </div>
        </div>
    );
};