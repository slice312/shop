import React from "react";
import PropTypes from "prop-types";
import css from "./styles.module.scss";


const propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export const AdvantageCard = ({title, image, description}) => {
    return (
        <div className={css.card}>
            <div className={css.container}>
                <img src={image} alt={image}/>
                <div className={css.title}>
                    {title}
                </div>
                <div className={css.description}>
                    {description}
                </div>
            </div>
        </div>
    );
};

AdvantageCard.propTypes = propTypes;