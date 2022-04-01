import React from "react";
import {Modal} from "react-bootstrap";
import {Api} from "src/shared/utils/api";
import {SuccessView} from "./SuccessView";
import css from "./styles.module.scss";
import userIcon from "src/assets/icons/user-outlined.svg";
import telephoneIcon from "src/assets/icons/telephone-outlined.svg";
import xmarkIcon from "src/assets/icons/x-mark.svg";


export const RequestCallbackModal = ({onClose}) => {
    const [success, setSuccess] = React.useState(false);
    const [name, setName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");


    const onBtnRequestCallClick = async () => {
        try {
            const response = await Api.siteService.putRequestCallBack(phoneNumber, name);
            if (response.status === 200) {
                console.log("putRequestCallBack success", response.data);
                setSuccess(true);
            } else {
                console.log("putRequestCallBack error", response.status);
            }
        } catch (err) {
            console.log("putRequestCallBack error", err);
        }
    };

    return (
        <Modal show={true}>
            {
                success
                    ? <SuccessView onButtonClick={onClose}/>
                    : (<div className={css.root}>
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
                                <div className={css.input}>
                                    <img src={telephoneIcon} alt="telephoneIcon"/>
                                    <input type="text"
                                           placeholder="Номер телефона"
                                           value={phoneNumber}
                                           onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <button type="button" onClick={onBtnRequestCallClick}>
                                    Заказать звонок
                                </button>
                            </div>
                        </div>
                    )
            }
        </Modal>
    );
};