import React from "react";
import css from "./styles.module.scss";


export const MobileView = () => {
    const totalAmount = 6825;
    const totalAmountWithDiscount = 6700;

    const totalQty = "4 линеек (20 шт.)"

    return (
        <div className={css.root}>
            <div className={css.title}>
                Сумма заказа
            </div>
            <div className={css.info}>
                <div className={css.labels}>
                    <span>Общее количество:</span>
                    <span>Стоимость:</span>
                </div>
                <div className={css.values}>
                    <span>{totalQty}</span>
                    <span>{totalAmount} шт</span>
                </div>
            </div>
            <div className={css.lineDiv}>
                <hr className={css.line}/>
            </div>
            <div className={css.info}>
                <div className={css.labels}>
                    <span>Итого к оплате:</span>
                </div>
                <div className={css.values}>
                    <span>{totalAmountWithDiscount} сом</span>
                </div>
            </div>
            <div className={css.buttonInfo}>
                Информация о заказе
            </div>
            <div className={css.buttonOrder}>
                Оформление заказа
            </div>
        </div>
    );
};