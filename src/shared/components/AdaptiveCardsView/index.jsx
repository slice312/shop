import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import css from "./styles.module.scss";


const propTypes = {
    cards: PropTypes.array.isRequired,
    CardElement: PropTypes.elementType.isRequired,
    className: PropTypes.string
};

export const AdaptiveCardsView = ({cards, CardElement, className}) => {
    return (
        <div className={cn(css.root, className)}>
            {
                cards.map((card, i) =>
                    <div key={i} className={css.wrap}>
                        <CardElement {...card}/>
                    </div>
                )
            }
        </div>
    );
};

AdaptiveCardsView.propTypes = propTypes;