import React from "react";
import css from "./styles.module.scss";


export const OrderInfo = () => {
    const productKindQty = 4;
    const totalProductQty = 20;
    const totalDiscountAmount = 125;
    const totalAmount = 6825;
    const totalAmountWithDiscount = totalAmount - totalDiscountAmount;

    const makeOrder = () => {

    };

    return (
        <div className={css.root}>
            <div className={css.title}>
                Сумма заказа
            </div>
            <div className={css.info}>
                <div className={css.labels}>
                    <span>Количество линеек:</span>
                    <span>Количество товаров:</span>
                    <span>Стоимость:</span>
                    <span>Скидка:</span>
                </div>
                <div className={css.values}>
                    <span>{productKindQty} шт</span>
                    <span>{totalProductQty} шт</span>
                    <span>{totalAmount} сом</span>
                    <span>{totalDiscountAmount} сом</span>
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

            <div className={css.buttonDiv}>
                <button type="button" onClick={makeOrder}>
                    Оформить заказ
                </button>
            </div>
        </div>
    );
};