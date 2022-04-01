import React from "react";
import css from "./styles.module.scss";
import checkCircleIcon from "src/assets/icons/check-circle.svg";


export const SuccessView = ({onButtonClick}) => {
    return (
        <div className={css.root}>
            <img src={checkCircleIcon} alt="checkCircleIcon"/>
            <div className={css.header}>
                Спасибо!
            </div>
            <div className={css.subHeader}>
                Ваша заявка была принята ожидайте, скоро Вам перезвонят
            </div>
            <div className={css.button}>
                <button type="button" onClick={onButtonClick}>
                    Продолжить покупки
                </button>
            </div>
        </div>
    );
};