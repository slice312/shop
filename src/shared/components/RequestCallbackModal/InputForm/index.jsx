import React from "react";
import {Alert} from "react-bootstrap";
import {Api} from  "src/shared/utils/api";
import css from "./styles.module.scss";
import xmarkIcon from "src/assets/icons/x-mark.svg";
import userIcon from  "src/assets/icons/user-outlined.svg";
import telephoneIcon from "src/assets/icons/telephone-outlined.svg";


export const InputForm = ({onSubmit, onClose}) => {
    const [name, setName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [isNotFilled, setIsNotFilled] = React.useState(false);

    const onBtnRequestCallClick = async () => {
        if (!name || !phoneNumber) {
            setIsNotFilled(true);
            return;
        }
        setIsNotFilled(false);

        try {
            const response = await Api.siteService.putRequestCallBack(phoneNumber, name);
            if (response.status === 200) {
                console.log("putRequestCallBack success", response.data);
                onSubmit();
            } else {
                console.log("putRequestCallBack error", response.status);
                onClose();
            }
        } catch (err) {
            console.log("putRequestCallBack error", err);
            onClose();
        }
    };


    return (
        <div className={css.root}>
            <button className={css.closeButton} type="button" onClick={onClose}>
                <img src={xmarkIcon} alt="xmarkIcon"/>
            </button>
            <p className={css.header}>Если у Вас остались вопросы</p>
            <p className={css.subHeader}>Оставьте заявку и мы обязательно</p>
            <p className={css.subHeader}>Вам перезвоним</p>

            <div className={css.inputs}>
                <div className={css.input}>
                    <img src={userIcon} alt="userIcon"/>
                    <input type="text"
                           placeholder="Как к вам обращаться?"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                    />
                </div>
                {
                    (isNotFilled && !name)
                        ? <Alert className={css.alert} variant="danger">Заполните поле</Alert>
                        : null
                }

                <div className={css.input}>
                    <img src={telephoneIcon} alt="telephoneIcon"/>
                    <input type="text"
                           placeholder="Номер телефона"
                           value={phoneNumber}
                           onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                {
                    (isNotFilled && !phoneNumber)
                        ? <Alert className={css.alert} variant="danger">Заполните поле</Alert>
                        : null
                }

                <button type="button" onClick={onBtnRequestCallClick}>
                    Заказать звонок
                </button>
            </div>
        </div>
    );
};