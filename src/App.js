import React from "react";
import {Routes, Route} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {Home} from "./components/Home";
import {About} from "./components/About";
import {Collections} from "./components/Collections";
import {News} from "./components/News";
import {CardDetail} from "./components/CardDetail";
import {setCommonSiteInfo} from "src/shared/state/commonSiteInfo/actions"
import css from "./App.module.scss";


export const App = () => {
    console.log("App render");
    const dispatch = useDispatch();
    React.useEffect(() => void dispatch(setCommonSiteInfo()), [dispatch]);

    return (
        <React.Fragment>
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
                        <Route path="/cards/:id" element={<CardDetail/>}/>
                    </Routes>
                    <Footer/>
                </div>
            </div>
        </React.Fragment>
    );
};