import React from "react";
import css from "./styles.module.scss";


export const DesktopView = ({cards, CardElement}) => {
    return (
        <div className={css.root}>
            {
                cards.map((card, i) =>
                    <CardElement key={i} {...card}/>
                )
            }
        </div>
    );
};