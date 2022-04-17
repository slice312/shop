import React from "react";
import PropTypes from "prop-types";
import css from "./styles.module.scss";
import checkCircleIcon from "src/assets/icons/check-circle.svg";


const propTypes = {
    title: PropTypes.string.isRequired,
    Text: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired
};

export const ModalSuccessView = ({title, Text, onClose}) => {
    return (
        <div className={css.root}>
            <img src={checkCircleIcon} alt={checkCircleIcon}/>
            <div className={css.header}>
                {title}
            </div>
            <div className={css.text}>
                {Text}
            </div>
            <div className={css.button}>
                <button type="button" onClick={onClose}>
                    Продолжить покупки
                </button>
            </div>
        </div>
    );
};

ModalSuccessView.propTypes = propTypes;