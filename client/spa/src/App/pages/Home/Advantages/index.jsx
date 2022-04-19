import React from "react";
import lo from "lodash";

import {Api} from "src/shared/utils/api";
import {AdvantageCard} from "./AdvantageCard";
import css from "./styles.module.scss";


export const Advantages = () => {
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            try {
                const response = await Api.Common.getUsAdvantages();
                setCards(lo.take(response.data, 4));
            } catch (err) {
                console.error("getUsAdvantages", err);
            }
        })();
    }, []);


    return (
        <div className={css.root}>
            <div className={css.title}>
                <h2>Наши преимущества</h2>
            </div>
            <div className={css.cards}>
                {
                    cards.map((x, i) => <AdvantageCard key={i} {...x}/>)
                }
            </div>
        </div>
    );
};