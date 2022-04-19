import React from "react";
import PropTypes from "prop-types";

import {Utils} from "src/shared/utils";
import css from "./styles.module.scss";

import arrowIcon from "src/assets/icons/arrow-right-white.svg";


const propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
};

export const CollectionCard = ({id, title, image}) => {
    const {navigateToCollectionPage} = Utils.Hooks.useProjectNavigation();
    const redirectToCollectionPage = () => navigateToCollectionPage(id);

    return (
        <div className={css.root} onClick={redirectToCollectionPage}>
            <div className={css.photo}>
                <img className={css.image} src={image} alt={image}/>
                <div className={css.title}>
                    {title}
                </div>
            </div>
            <div className={css.buttonDiv} onClick={redirectToCollectionPage}>
                Смотреть все
                <img src={arrowIcon} alt={arrowIcon}/>
            </div>
        </div>
    );
};

CollectionCard.propTypes = propTypes;