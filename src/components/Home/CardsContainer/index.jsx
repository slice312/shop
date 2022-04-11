import React from "react";
import PropTypes from "prop-types";
import {CardsView} from "src/shared/components/CardsView";
import css from "./styles.module.scss";


const propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired,
    onButtonLoadClick: PropTypes.func.isRequired,
    CardElement: PropTypes.elementType.isRequired
};

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

CardsContainer.propTypes = propTypes;