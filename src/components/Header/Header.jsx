import cn from "classnames";
import css from "./Header.module.scss";

export const Header = () => {
    return (
        <header className={css.root}>
            <div className={css.group1}>
                <div className={css.flex1}>
                    <div className={css.txt}>
                        О нас
                    </div>
                    <div className={css.txt}>
                        Коллекции
                    </div>
                    <div className={css.txt}>
                        Новости
                    </div>
                    <div className={css.flexSpacer}/>
                    <div className={css.grayTxt}>
                        Тел:
                    </div>
                    <div className={css.txt}>
                        +996 000 00 00 00
                    </div>
                </div>
            </div>
        </header>
    );
};