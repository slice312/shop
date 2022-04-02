import React from "react";
import arrowIcon from "src/assets/icons/arrow-right-white.svg";
import css from "./styles.module.scss";


export const CollectionCard = ({title, image}) => {
    return (
        <div className={css.root}>
            <div className={css.photo}>
                <img src={image} alt={image}/>
                <div className={css.title}>
                    {title}
                </div>
            </div>
            <div className={css.buttonDiv}>
                Смотреть все
                <img src={arrowIcon} alt="arrowIcon"/>
            </div>
        </div>
    );
};