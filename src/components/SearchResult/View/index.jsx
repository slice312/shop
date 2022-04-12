import React from "react";
import css from "./styles.module.scss";


export const DesktopView = ({cards, CardElement}) => {
    return (
        <div className={css.root}>
            {
                cards.map((card, i) =>
                    <div className={css.wrap}>
                        <CardElement key={i} {...card}/>
                    </div>
                )
            }
        </div>
    );
};