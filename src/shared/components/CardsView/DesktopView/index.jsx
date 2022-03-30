import React from "react";
import {Card} from "src/shared/components/Card";
import css from "./styles.module.scss";



export const DesktopView = ({cards}) => {
    return (
        <div className={css.root}>
            {
                cards.map((card, i) =>
                    <Card key={i} {...card}/>
                )
            }
        </div>
    );
};