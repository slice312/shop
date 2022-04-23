import React from "react";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {isMobile} from "react-device-detect";
import {getAuth, signInAnonymously} from "firebase/auth";


import {loadCommonSiteInfo} from "src/shared/state/commonSiteInfo/actions"
import {restoreBasket} from "src/shared/state/basket/actions";
import {Router} from "./Router";
import {FloatButtons} from "src/App/FloatButtons";
import {Header} from "./Header";
import {BreadcrumbsProvider} from "src/shared/components/Breadcrumbs"
import {Breadcrumbs} from "./BreadCrumbs";
import {Footer} from "./Footer";
import {Login} from "./Login";
import css from "./styles.module.scss";
// import {Auth} from "../shared/utils/auth";


export const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [isAuth, setIsAuth] = React.useState(false);

    React.useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged(credential => {
            // debugger

            console.log("firebase.onAuthStateChanged", credential);

            if (credential) {
                setIsAuth(true);

                credential.getIdToken()
                    .then(token => {
                    });
            } else {
                signInAnonymously(auth)
                    .then(() => {
                        console.log("anonymous auth success");
                    })
                    .catch(err => {
                        console.error("anonymous auth failed", err);
                    });
            }
        });
    }, []);


    React.useEffect(() => {
        dispatch(loadCommonSiteInfo())
    }, [isAuth]);

    React.useEffect(() => {
        dispatch(restoreBasket())
    }, []);


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
                    {/*<Login/>*/}
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