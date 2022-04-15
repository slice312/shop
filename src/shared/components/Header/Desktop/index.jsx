import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import cn from "classnames";

import {Utils} from "src/shared/utils";
import {SearchControl} from "./SearchControl";
import css from "./style.module.scss";

import emptyHeartIcon from "src/assets/icons/empty-heart.svg";
import shoppingBagIcon from "src/assets/icons/shopping-bag.svg";


export const Desktop = () => {
    const {headerLogo, mainPhoneNumber} = useSelector(state => state.commonSiteInfo);
    const basketItems = useSelector(state => state.basket.items);

    const {navigateToFavorites, navigateToBasket} = Utils.Hooks.useProjectNavigation();


    return (
        <header className={css.root}>
            <div className={css.navbarUp}>
                <div className={css.pageLinks}>
                    <Link to="/about">О нас</Link>
                    <Link to="/collections">Коллекции</Link>
                    <Link to="/news">Новости</Link>
                </div>

                <div className={css.telephone}>
                    <span className={css.label}>
                        Тел:
                    </span>
                    <span className={css.value}>
                        {mainPhoneNumber}
                    </span>
                </div>
            </div>

            <div className={css.navbarDown}>
                <div className={css.logo}>
                    <Link to="/">
                        <img src={headerLogo} alt={headerLogo}/>
                    </Link>
                </div>

                <SearchControl className={css.inputWrap}/>

                <div className={cn(css.iconButton, css.favorite)} onClick={navigateToFavorites}>
                    <div className={css.icon}>
                        <img src={emptyHeartIcon} alt={emptyHeartIcon}/>
                        <div className={css.redCircleNotify}/>
                    </div>
                    <span className={css.label}>Избранное</span>
                </div>

                <div className={cn(css.iconButton, css.basket)} onClick={navigateToBasket}>
                    <div className={css.icon}>
                        <img src={shoppingBagIcon} alt={shoppingBagIcon}/>
                        {
                            (basketItems.length)
                                ? <div className={css.redCircleNotify}/>
                                : null
                        }
                    </div>
                    <span className={css.label}>Корзина</span>
                </div>
            </div>
        </header>
    );
};