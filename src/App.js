import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Header} from "./components/Header/Header";

const App = () => {
    return (
        <BrowserRouter>
            <Header/>

            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="" className="d-block w-100" alt="mo"/>
                    </div>
                    <div className="carousel-item">
                        <img src="" className="d-block w-100" alt="das."/>
                    </div>
                    <div className="carousel-item">
                        <img src="" className="d-block w-100" alt="gfdg"/>
                    </div>
                </div>
            </div>
            <Routes>
                {/*<Route path="/" element={<Home/>}/>*/}
                {/*    <Route path="/register" element={<Register/>}/>*/}
                {/*    <Route path="/login" element={<Login/>}/>*/}
            </Routes>
        </BrowserRouter>
    );
}


export default App;
