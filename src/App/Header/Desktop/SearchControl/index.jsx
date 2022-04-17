import React from "react";
import cn from "classnames";
import * as KeyCode from "keycode-js";

import {Utils} from "src/shared/utils";
import {Api} from "src/shared/utils/api";
import css from "./styles.module.scss";

import searchIcon from "src/assets/icons/search.svg";


export const SearchControl = ({className}) => {
    const [searchResult, setSearchResult] = React.useState({});
    const [isShowSearchResult, setIsShowSearchResult] = React.useState(false);


    const searchInputHandle = (e) => {
        setIsShowSearchResult(true);

        const text = e.target.value;
        if (!text) {
            setSearchResult({});
            return;
        }

        (async () => {
            try {
                const response = await Api.Products.getProductsByName(text);
                if (response.status === 200) {
                    setSearchResult(response.data);
                    console.log("getProductsByName success", response.data);
                }
            } catch (err) {
                console.error("getProductsByName error", err);
            }
        })();
    };


    const inputRef = React.useRef(null);
    const {navigateToProductPage, navigateToSearch} = Utils.Hooks.useProjectNavigation();

    const searchResultRef = React.useRef(null);
    Utils.Hooks.useOutsideAlerter(searchResultRef, () => setIsShowSearchResult(false));


    const searchSubmitByIconButton = () => {
        navigateToSearchResult();
    };

    const searchSubmitByEnter = (e) => {
        if (e.type === "keydown" && e.code === KeyCode.CODE_ENTER) {
            navigateToSearchResult();
            setIsShowSearchResult(false);
        }
    };

    const navigateToSearchResult = () => {
        navigateToSearch({
            state: {
                query: inputRef.current.value,
                result: searchResult
            }
        });
    };

    const searchResultItemClicked = (id) => {
        navigateToProductPage(id);
        setIsShowSearchResult(false);
    };


    return (
        <div className={cn(css.root, className)}>
            <input ref={inputRef}
                   type="text"
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
                                             onClick={() => searchResultItemClicked(x.id)}
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
    );
};