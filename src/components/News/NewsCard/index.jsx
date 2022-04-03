import React from "react";
import css from "./styles.module.scss";


export const NewsCard = ({title, image, text}) => {
    return (
        <div className={css.card}>
            <div className={css.image}>
                <img src={image} alt={image}/>
            </div>
            <div className={css.textBlock}>
                <div className={css.title}>
                    {title}
                </div>
                <div className={css.text}>
                    {text}
                </div>
            </div>
        </div>
    );
};