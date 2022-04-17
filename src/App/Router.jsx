import React from "react";
import {Route, Routes} from "react-router-dom";

import {Home} from "./pages/Home";
import {Collections} from "./pages/Collections";
import {Favorites} from "./pages/Favorites";
import {Collection} from "./pages/Collection";
import {Product} from "./pages/Product";
import {SearchResult} from "./pages/SearchResult";
import {Basket} from "./pages/Basket";
import {News} from "./pages/News";
import {PublicOffer} from "./pages/PublicOffer";
import {Help} from "./pages/Help";
import {About} from "./pages/About";


export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/collections" element={<Collections/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
            <Route path="/collections/:id" element={<Collection/>}/>
            <Route path="/products/:id" element={<Product/>}/>
            <Route path="/search" element={<SearchResult/>}/>
            <Route path="/basket" element={<Basket/>}/>
            <Route path="/news" element={<News/>}/>
            <Route path="/public-offer" element={<PublicOffer/>}/>
            <Route path="/help" element={<Help/>}/>
            <Route path="/about" element={<About/>}/>
        </Routes>
    );
};