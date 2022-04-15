import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

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
                            <div className={css.menuContainer}>
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
                                        <span className={css.value}>{mainPhoneNumber}</span>
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
                            <div className={css.inputWrap}>
                                <input placeholder="Поиск" onChange={(e) => console.log("handkler")}/>
                                <div className={css.icon24}>
                                    <img src={searchIcon} alt={searchIcon}/>
                                </div>
                            </div>
                            {/*{*/}
                            {/*    searchValue ? (*/}
                            {/*        <div className={css.searchResult}>*/}
                            {/*            {*/}
                            {/*                searchProducts ? searchProducts.map(item => (*/}
                            {/*                    <div key={item.id}>{item.title}</div>*/}
                            {/*                )) : null*/}
                            {/*            }*/}
                            {/*        </div>*/}
                            {/*    ) : null*/}
                            {/*}*/}
                        </div>
                    ) : null
            }
        </div>
    );
};