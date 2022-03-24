import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Index} from "./components/Header";
import {Home} from "./components/Home";
import css from "./App.module.css";
import {Provider} from "react-redux";
import {store} from "src/shared/state/store";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className={css.container}>
                    <Index/>

                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        {/*    <Route path="/register" element={<Register/>}/>*/}
                        {/*    <Route path="/login" element={<Login/>}/>*/}
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
}


export default App;
