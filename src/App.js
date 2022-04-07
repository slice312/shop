import React from "react";
import {Routes, Route} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Header} from "./shared/components/Header";
import {Footer} from "./shared/components/Footer";
import {Home} from "./components/Home";
import {About} from "./components/About";
import {Collections} from "./components/Collections";
import {News} from "./components/News";
import {Product} from "./components/Product";
import {Collection} from "./components/Collection";
import {setCommonSiteInfo} from "src/shared/state/commonSiteInfo/actions"
import {FloatButtons} from "src/shared/components/FloatButtons";
import {PublicOffer} from "./components/PublicOffer";
import {Help} from "./components/Help";


import css from "./App.module.scss";


export const App = () => {
    console.log("App render");
    const dispatch = useDispatch();
    React.useEffect(() => void dispatch(setCommonSiteInfo()), [dispatch]);

    return (
        <React.Fragment>
            <FloatButtons/>
            <div className={css.headerContainer}>
                <div className={css.limitContainer}>
                    <Header/>
                </div>
            </div>

            <div className={css.contentContainer}>
                <div className={css.limitContainer}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/collections" element={<Collections/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/products/:id" element={<Product/>}/>
                        <Route path="/collections/:id" element={<Collection/>}/>
                        <Route path="/public-offer" element={<PublicOffer/>}/>
                        <Route path="/help" element={<Help/>}/>
                    </Routes>
                    <Footer/>
                </div>
            </div>
        </React.Fragment>
    );
};