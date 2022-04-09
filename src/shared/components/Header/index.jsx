import {useSelector} from "react-redux";
import searchIcon from "src/assets/icons/search.svg";
import css from "./Header.module.scss";
import {Link} from "react-router-dom";
import emptyHeartIcon from "src/assets/icons/empty-heart.svg";
import shoppingBagIcon from "src/assets/icons/shopping-bag.svg";


export const Header = () => {
    const {headerLogo, phoneNumber} = useSelector(state => state.siteCommonInfo);

    console.log("Header render");
    return (
        <header className={css.root}>
            <div className={css.group1}>
                <div className={css.group1_left}>
                    <Link to="/about">
                        О нас
                    </Link>
                    <Link to="/collections">
                        Коллекции
                    </Link>
                    <Link to="/news">
                        Новости
                    </Link>
                </div>

                <div className={css.group1_right}>
                    <span className={css.grayTxt}>
                        Тел:
                    </span>
                    <span>
                        {phoneNumber}
                    </span>
                </div>
            </div>

            <div className={css.group2}>
                <div className={css.group2_left}>
                    <Link to="/">
                        <img src={headerLogo} alt="headerLogo"/>
                    </Link>
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