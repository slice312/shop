import {Routes, Route} from "react-router-dom";
import {Header} from "./components/Header";
import {Home} from "./components/Home";
import {About} from "./components/About";
import {Collections} from "./components/Collections";
import {News} from "./components/News";

import css from "./App.module.scss";


export const App = () => {
    return (
        <div className={css.container}>
            <Header/>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/collections" element={<Collections/>}/>
                <Route path="/news" element={<News/>}/>
            </Routes>
        </div>
    );
}