import React from "react";
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";

import {Utils} from "src/shared/utils"
import {SearchControl} from "src/shared/components/SearchControl";
import css from "./styles.module.scss";

import menuIcon from "src/assets/icons/menu-burger.svg";
import searchIcon from "src/assets/icons/search.svg";
import closeIcon from "src/assets/icons/x-mark.svg";
import emptyHeartIcon from "src/assets/icons/empty-heart.svg";
import shoppingBagIcon from "src/assets/icons/shopping-bag.svg";


export const Mobile = () => {
    const {headerLogo, mainPhoneNumber} = useSelector(state => state.commonSiteInfo);

    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [isSearchOpen, setIsSearchOpen] = React.useState(false)

    const location = useLocation();
    React.useEffect(() => void setIsMenuOpen(false), [location]);
    const menuRef = React.useRef(null);
    Utils.Hooks.useOutsideAlerter(menuRef, () => setIsMenuOpen(false));

    return (
        <div className={css.root}>
            <div className={css.header}>
                <img src={menuIcon} alt={menuIcon} onClick={() => setIsMenuOpen(true)}/>
                <div className={css.logo}>
                    <Link to="/">
                        <img src={headerLogo} alt={headerLogo}/>
                    </Link>
                </div>
                <div className={css.icon24} onClick={() => setIsSearchOpen(prev => !prev)}>
                    {
                        isSearchOpen
                            ? <img src={closeIcon} alt={closeIcon}/>
                            : <img src={searchIcon} alt={searchIcon}/>
                    }
                </div>
            </div>
            {
                (isMenuOpen)
                    ? (<div className={css.menuDrawer}>
                            <div ref={menuRef} className={css.menuContainer}>
                                <div className={css.menuHeader}>
                                    <div className={css.title}>Меню</div>
                                    <div className={css.icon24} onClick={() => setIsMenuOpen(false)}>
                                        <img src={closeIcon} alt={closeIcon}/>
                                    </div>
                                </div>
                                <div className={css.menuBody}>
                                    <Link to="/about">О нас</Link>
                                    <Link to="/news">Новости</Link>
                                    <Link to="/collections">Коллекции</Link>
                                    <div className={css.menuBodyIconButtons}>
                                        <div>
                                            <img src={emptyHeartIcon} alt={emptyHeartIcon}/>
                                            <Link to="/favorites">Избранное</Link>
                                        </div>
                                        <div>
                                            <img src={shoppingBagIcon} alt={shoppingBagIcon}/>
                                            <Link to="/basket">Корзина</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className={css.menuFooter}>
                                    <div>Свяжитесь с нами:</div>
                                    <div className={css.telephone}>
                                        <span className={css.label}>Тел:</span>
                                        <span className={css.value}>
                                            <a href={`tel:+${mainPhoneNumber}`}>{mainPhoneNumber}</a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null
            }
            {
                (isSearchOpen)
                    ? (
                        <div className={css.search}>
                            <SearchControl className={css.inputWrap} onRedirectToResult={() => setIsSearchOpen(false)}/>
                        </div>
                    ) : null
            }
        </div>
    );
};