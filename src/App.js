import {BrowserRouter, Routes, Route} from "react-router-dom";
import {MDBContainer, MDBRow, MDBCol} from "mdb-react-ui-kit";
import {Header} from "./components/Header";

const App = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                {/*<Route path="/" element={<Home/>}/>*/}
                {/*    <Route path="/register" element={<Register/>}/>*/}
                {/*    <Route path="/login" element={<Login/>}/>*/}
            </Routes>
        </BrowserRouter>
    );
}


export default App;
