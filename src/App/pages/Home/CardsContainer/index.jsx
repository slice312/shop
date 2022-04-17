import React from "react";
import PropTypes from "prop-types";
import {isMobile} from "react-device-detect";

import {MobileSlideCardsView} from "src/shared/components/MobileSlideCardsView";
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
            {
                isMobile
                    ? (<MobileSlideCardsView
                            className={css.randomMobileCardsContainer}
                            products={cards}
                            CardElement={CardElement}
                            chunkSize={5}
                        />
                    )
                    : (
                        <div className={css.randomCardsContainer}>
                            {
                                cards.map((x, i) => <CardElement key={i} {...x}/>)
                            }
                        </div>
                    )
            }
            <div className={css.buttonDiv}>
                <button type="button" onClick={onButtonLoadClick}>Еще</button>
            </div>
        </div>
    );
};

CardsContainer.propTypes = propTypes;