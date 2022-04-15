import React from "react";
import Select from "react-select";
import css from "./styles.module.scss";


const data = [
    {
        value: 1,
        text: 'Up Arrow',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
        </svg>
    },
    {
        value: 2,
        text: 'Down Arrow',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
        </svg>
    },
    {
        value: 3,
        text: 'Left Arrow',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
        </svg>
    },
    {
        value: 4,
        text: 'Right Arrow',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
        </svg>
    }
];

// https://www.cluemediator.com/how-to-add-an-icon-in-the-react-select-dropdown
export const OrderModal = () => {

    const [selectedOption, setSelectedOption] = React.useState(null);

    return (
        <div className={css.root}>
            <div className={css.container}>
                <div className={css.header}>
                    Оформление заказа
                </div>
                <div className={css.body}>
                    <div className={css.field}>
                        <div className={css.label}>Ваше имя</div>
                        <input type="text" placeholder={"Иван"}/>
                    </div>
                    <div className={css.field}>
                        <div className={css.label}>Ваше фамилия</div>
                        <input type="text" placeholder={"Иванов"}/>
                    </div>
                    <div className={css.field}>
                        <div className={css.label}>Электронная почта</div>
                        <input type="text" placeholder={"example.a@"}/>
                    </div>
                    <div className={css.field2}>
                        <div className={css.label}>Ваш номер телефонаa</div>
                        <Select
                            placeholder="Select Option"
                            value={selectedOption}
                            options={data}
                            getOptionLabel={e => (
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    {e.icon}
                                    <span style={{marginLeft: 5}}>{e.text}</span>
                                </div>
                            )}
                        />
                        <input type="text" placeholder={"7001122"}/>
                    </div>
                    <div className={css.field}>
                        <div className={css.label}>Страна</div>
                        <input type="text" placeholder={"Россия"}/>
                    </div>
                    <div className={css.field}>
                        <div className={css.label}>Город</div>
                        <input type="text" placeholder={"Москва"}/>
                    </div>
                    <div className={css.field}>
                        <input type="checkbox"/>
                    </div>
                </div>
            </div>
        </div>
    );
};