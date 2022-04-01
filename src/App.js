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
    const dispatch = useDispatch();
    React.useEffect(() => void dispatch(setCommonSiteInfo()), [dispatch]);

    return (
        <div className={css.container}>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/collections" element={<Collections/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/cards/:id" element={<CardDetail/>}/>
            </Routes>
            <Footer/>
        </div>
    );
};