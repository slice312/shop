import css from "./Header.module.scss";
import zeonLogo from "src/assets/img/zeon_logo.svg";
import emptyHeartIcon from "src/assets/icons/empty-heart.svg";
import shoppingBagIcon from "src/assets/icons/shopping-bag.svg";
import searchIcon from "src/assets/icons/search.svg";



export const Index = () => {
    return (
        <header className={css.root}>
            <div className={css.group1}>
                <div className={css.group1_left}>
                    <div className={css.txt}>
                        О нас
                    </div>
                    <div className={css.txt}>
                        Коллекции
                    </div>
                    <div className={css.txt}>
                        Новости
                    </div>
                </div>
                <div className={css.group1_right}>
                    <div className={css.grayTxt}>
                        Тел:
                    </div>
                    <div className={css.txt}>
                        +996 000 00 00 00
                    </div>
                </div>
            </div>

            <div className={css.group2}>
                <div className={css.group2_left}>
                    <img src={zeonLogo} alt="zeonLogo"/>
                </div>
                <div className={css.group2_right}>
                    <div className={css.group2_right_item1}>
                        <div className={css.inputWrap}>
                            <input type="search" placeholder="Поиск"/>
                            <button type="button">
                                <img src={searchIcon} alt="emptyHeartIcon"/>
                            </button>
                        </div>
                    </div>
                    <div className={css.group2_right_item2}>
                        <img src={emptyHeartIcon} alt="emptyHeartIcon"/>
                        <span>Избранное</span>
                    </div>
                    <div className={css.group2_right_item3}>
                        <img src={shoppingBagIcon} alt="shoppingBagIcon"/>
                        <span>Корзина</span>
                    </div>
                </div>

            </div>
        </header>
    );
};