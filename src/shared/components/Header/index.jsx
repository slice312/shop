import React from "react";
import {useSelector} from "react-redux";
import {Api} from "src/shared/utils/api";
import searchIcon from "src/assets/icons/search.svg";
import css from "./Header.module.scss";
import {Link, useNavigate} from "react-router-dom";
import emptyHeartIcon from "src/assets/icons/empty-heart.svg";
import shoppingBagIcon from "src/assets/icons/shopping-bag.svg";
import {Utils} from "src/shared/utils";
import * as KeyCode  from "keycode-js";


// TODO: отрефакторить
export const Header = () => {
    const {headerLogo, mainPhoneNumber} = useSelector(state => state.commonSiteInfo);
    const [searchResult, setSearchResult] = React.useState({});
    const [isShowSearchResult, setIsShowSearchResult] = React.useState(false);

    const {navigateToProductPage, navigateToSearch} = Utils.Hooks.useProjectNavigation();

    const searchInputHandle = (e) => {
        setIsShowSearchResult(true);
        const text = e.target.value;
        if (!text) {
            setSearchResult({});
            return;
        }

        (async () => {
            try {
                const response = await Api.getProductsByName(text);
                if (response.status === 200) {
                    console.log("getProductsByName success", response.data);
                    setSearchResult(response.data);
                }
            } catch (err) {
                console.error("getProductsByName error", err);
            }
        })();
    };


    const searchSubmitByIconButton = () => {
        if (searchResult.count)
            navigateToSearch({state: {searchResult}});
    };

    const searchSubmitByEnter = (e) => {
        if (e.type === "keydown" && e.code === KeyCode.CODE_ENTER) {
            if (searchResult.count) {
                navigateToSearch({state: {searchResult}});
                setIsShowSearchResult(false);
            }
        }
    };

    const searchResultRef = React.useRef(null);
    Utils.Hooks.useOutsideAlerter(searchResultRef, () => setIsShowSearchResult(false));

    return (
        <header className={css.root}>
            <div className={css.topRow}>
                <div className={css.pageLinks}>
                    <Link to="/about"> О нас </Link>
                    <Link to="/collections"> Коллекции </Link>
                    <Link to="/news"> Новости </Link>
                </div>

                <div className={css.telephone}>
                    <span className={css.grayTxt}>
                        Тел:
                    </span>
                    <span>
                        {mainPhoneNumber}
                    </span>
                </div>
            </div>

            <div className={css.secondRow}>
                <div className={css.group2_left}>
                    <Link to="/">
                        <img src={headerLogo} alt="headerLogo"/>
                    </Link>
                </div>
                <div className={css.group2_right}>
                    <div className={css.group2_right_item1}>
                        <div className={css.inputWrap}>
                            <input type="text"
                                   placeholder="Поиск"
                                   onChange={searchInputHandle}
                                   onKeyDown={searchSubmitByEnter}
                            />
                            <div className={css.searchIcon} onClick={searchSubmitByIconButton}>
                                <img src={searchIcon} alt={searchIcon}/>
                            </div>
                            {
                                (isShowSearchResult && searchResult.count)
                                    ? (
                                        <div ref={searchResultRef} className={css.searchResult}>
                                            {
                                                searchResult.matches.map((x, i) => {
                                                    return (
                                                        <div key={i}
                                                             className={css.searchItem}
                                                             onClick={() => navigateToProductPage(x.id)}
                                                        >
                                                            {x.title}
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    )
                                    : null
                            }
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