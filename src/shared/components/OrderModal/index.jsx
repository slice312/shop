import React from "react";
import ReactFlagsSelect from "react-flags-select";
import cn from "classnames";
import css from "./styles.module.scss";
import {Link} from "react-router-dom";
import {Utils} from "src/shared/utils";
import * as KeyCode from "keycode-js";
import {SuccessView} from "./SuccessView";
import closeIcon from "src/assets/icons/x-mark.svg";


const countryCodes = {
    KG: "+996",
    RU: "+7",
    KZ: "+7",
    US: "+775",
    GB: "+50"
};


export const OrderModal = ({onCloseClick}) => {
    const [selected, setSelected] = React.useState("KG");


    const nameRef = React.useRef(null);
    const surnameRef = React.useRef(null);
    const emailRef = React.useRef(null);
    const phoneRef = React.useRef(null);
    const countryRef = React.useRef(null);
    const cityRef = React.useRef(null);

    const [isNameEmpty, setIsNameEmpty] = React.useState(false);
    const [isSurnameEmpty, setIsSurnameEmpty] = React.useState(false);
    const [isEmailEmpty, setIsEmailEmpty] = React.useState(false);
    const [isPhoneEmpty, setIsPhoneEmpty] = React.useState(false);
    const [isCountryEmpty, setIsCountryEmpty] = React.useState(false);
    const [isCityEmpty, setIsCityEmpty] = React.useState(false);
    const [publicOfferChecked, setPublicOfferChecked] = React.useState(false);

    const [success, setSuccess] = React.useState(false);


    const makeOrder = () => {
        validate();
        const isOk = !(isNameEmpty && isSurnameEmpty && isEmailEmpty && isPhoneEmpty
            && isCountryEmpty && isCityEmpty && publicOfferChecked);

        console.log("makeOrder", isOk);
        setSuccess(isOk);
    };

    const validate = () => {
        setIsNameEmpty(!nameRef.current.value);
        setIsSurnameEmpty(!surnameRef.current.value);
        setIsEmailEmpty(!emailRef.current.value);
        setIsPhoneEmpty(!phoneRef.current.value); // TODO сделать
        setIsCountryEmpty(!countryRef.current.value);
        setIsCityEmpty(!cityRef.current.value);
    };

    const inputPhoneNumberHandle = (e) => {
        if (e.code !== KeyCode.CODE_BACK_SPACE && !Utils.isValidPhoneNumber(e.key)) {
            e.preventDefault();
        }
    };


    return (
        <div className={css.root}>
            {
                success ? <SuccessView onButtonClick={() => console.log("A")}/>
                    :
                    (
                        <div className={css.container}>

                            <div className={css.header}>
                                <div className={css.title}>
                                    Оформление заказа
                                </div>
                                <div className={css.closeIcon} onClick={onCloseClick}>
                                    <img src={closeIcon} alt={closeIcon}/>
                                </div>
                            </div>
                            <div className={css.body}>
                                <div className={css.field}>
                                    <div className={cn(css.fieldLabel, isNameEmpty && css.errorFieldLabel)}>
                                        Ваше имя
                                    </div>
                                    <input ref={nameRef}
                                           className={cn(css.inputField, isNameEmpty && css.errorInputField)}
                                           type="text"
                                           placeholder="Введите имя"
                                    />
                                </div>
                                <div className={css.field}>
                                    <div className={cn(css.fieldLabel, isSurnameEmpty && css.errorFieldLabel)}>
                                        Ваша фамилия
                                    </div>
                                    <input ref={surnameRef}
                                           className={cn(css.inputField, isSurnameEmpty && css.errorInputField)}
                                           type="text"
                                           placeholder="Введите фамилию"
                                    />
                                </div>
                                <div className={css.field}>
                                    <div className={cn(css.fieldLabel, isEmailEmpty && css.errorFieldLabel)}>
                                        Электронная почта
                                    </div>
                                    <input ref={emailRef}
                                           className={cn(css.inputField, isEmailEmpty && css.errorInputField)}
                                           type="text"
                                           placeholder="example@gmail.com"
                                    />
                                </div>
                                <div className={css.phoneField}>
                                    <div className={cn(css.fieldLabel, isPhoneEmpty && css.errorFieldLabel)}>
                                        Ваш номер телефона
                                    </div>
                                    <div className={cn(css.inputWrap, isPhoneEmpty && css.errorInputField)}>
                                        <div className={cn(css.dropDownWrap)}>
                                            <ReactFlagsSelect
                                                countries={["KG", "RU", "KZ", "US", "GB"]}
                                                customLabels={countryCodes}
                                                selected={selected}

                                                onSelect={(code) => setSelected(code)}
                                            />
                                        </div>
                                        <input ref={phoneRef}
                                               className={cn(css.inputField, css.inputPhone, isPhoneEmpty && css.errorInputField)}
                                               type="text"
                                               placeholder="Введите номер телефона"
                                               onKeyDown={inputPhoneNumberHandle}
                                        />
                                    </div>
                                </div>
                                <div className={css.field}>
                                    <div className={cn(css.fieldLabel, isCountryEmpty && css.errorFieldLabel)}>Страна
                                    </div>
                                    <input ref={countryRef}
                                           className={cn(css.inputField, isCountryEmpty && css.errorInputField)}
                                           type="text"
                                           placeholder="Кыргызстан"
                                    />
                                </div>
                                <div className={css.field}>
                                    <div className={cn(css.fieldLabel, isCityEmpty && css.errorFieldLabel)}>
                                        Город
                                    </div>
                                    <input ref={cityRef}
                                           className={cn(css.inputField, isCityEmpty && css.errorInputField)}
                                           type="text"
                                           placeholder="Бишкек"
                                    />
                                </div>
                                <div className={css.checkbox}>
                                    <input type="checkbox"
                                           onClick={() => setPublicOfferChecked(prev => !prev)}
                                           checked={publicOfferChecked}
                                           onChange={(e) => console.log("checkbox", e)}
                                    />
                                    <span>Согласен с условиями</span> &nbsp;
                                    <Link to="/public-offer">публичной офферты</Link>
                                </div>
                                <div className={css.button} onClick={makeOrder}>
                                    Заказать
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    );
}