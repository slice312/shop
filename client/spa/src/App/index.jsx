import React from "react";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {isMobile} from "react-device-detect";

import {loadCommonSiteInfo} from "src/shared/state/commonSiteInfo/actions"
import {restoreBasket} from "src/shared/state/basket/actions";
import {Router} from "./Router";
import {FloatButtons} from "src/App/FloatButtons";
import {Header} from "./Header";
import {BreadcrumbsProvider} from "src/shared/components/Breadcrumbs"
import {Breadcrumbs} from "./BreadCrumbs";
import {Footer} from "./Footer";
import css from "./styles.module.scss";


export const App = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(loadCommonSiteInfo())
        dispatch(restoreBasket())
    }, []);

    const location = useLocation();


    return (
        <BreadcrumbsProvider>
            <FloatButtons/>

            <div className={css.headerContainer}>
                <div className={css.limitContainer}>
                    <Header/>
                    <Breadcrumbs/>
                </div>
            </div>


            <div className={css.contentContainer}>
                <div className={css.limitContainer}>
                    <Router/>
                </div>
            </div>

            <div className={css.footerContainer}>
                <div className={css.limitContainer}>
                    {
                        // в мобильной версии корзины футера нет
                        (location.pathname === "/basket" && isMobile)
                            ? null
                            : <Footer/>
                    }
                </div>
            </div>
        </BreadcrumbsProvider>
    );
};

/**
 * TODO:
 * 1) Footer instagram. reduce, db, typedef
 * 2) Header - search и рефакторинг
 *
 */