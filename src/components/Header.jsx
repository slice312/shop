import {MDBCol, MDBContainer, MDBInput, MDBRow} from "mdb-react-ui-kit";
import css from "./Header.module.css";

export const Header = () => {
    return (
        <MDBContainer fluid>
            <MDBRow>
                <MDBCol sm="6" md="6">
                    <span className={css.label}>О Нас</span>
                    <span>Коллекции</span>
                    <span>Новости</span>
                </MDBCol>
                <MDBCol sm="6" md="6" className="text-end" >
                    <span>Тел: 996 777 38 27 50</span>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md="2">
                    <img src="" alt="zeon logo"/></MDBCol>
                <MDBCol md="6">
                    <MDBInput  type="search" />
                </MDBCol>
                <MDBCol md="2">
                    <span>Избранное</span>
                </MDBCol>
                <MDBCol md="2">
                    <span>Корзина</span>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};