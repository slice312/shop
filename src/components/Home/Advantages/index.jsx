import React from "react";
import {AdvantageCard} from "./AdvantageCard";
import css from "./styles.module.scss";
import payMoneyIcon from "src/assets/icons/pay-money.svg";
import truckIcon from "src/assets/icons/truck.svg";
import supportIcon from "src/assets/icons/support.svg";
import shoppingBagIcon from "src/assets/icons/shopping-bag-2.svg";


export const Advantages = () => {
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


const cards = [
    {
        title: "Удобные способы оплаты",
        image: payMoneyIcon,
        description: "Мы предлагаем возможность безналичной оплаты"
    },
    {
        title: "Cвоевременная доставка",
        image: truckIcon,
        description: "100% гарантия возврата товара - 14 дней на возврат, без скандалов и истерик."
    },
    {
        title: "Профессиональная консультация",
        image: supportIcon,
        description: "Мы проконсультируем и индивидуально подойдем к Вашему заказу"
    },
    {
        title: "Акции и бонусы для покупателей",
        image: shoppingBagIcon,
        description: "Промокоды со скидками для постоянных клиентов, акции на новые позиции"
    }
];