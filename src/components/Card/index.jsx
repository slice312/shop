import React from "react";
import css from "./Card.module.scss";
import cardImg from "src/assets/mock/cards/card1.png";
import filledHearIcon from "src/assets/icons/filled-heart.svg";
import emptyHeartIcon from "src/assets/icons/empty-heart.svg";

export const Card = () => {

    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [isFavorite, setIsFavorite] = React.useState(false);

    const handler = () => {
        setIsFavorite(prev => !prev);
        console.log("cliocl");
    }
    return (
        <div className={css.root}>
            <img className={css.photo} src={cardImg} alt="cardImg"/>

            <FavButton isFavorite={isFavorite} onClick={handler}/>
            <div className={css.description}>
                <div className={css.name}>
                    Вечернее платье
                </div>
                <div>
                    <span className={css.price}>1365 c</span>
                    <span className={css.oldPrice}>1500 c</span>
                </div>
                <div className={css.size}>
                    Размер: 42-50
                </div>
                <div className={css.buttons}>
                    <button type="button" style={{backgroundColor: "#73A39D"}}/>
                    <button type="button" style={{backgroundColor: "#84CC4C"}}/>
                    <button type="button" style={{backgroundColor: "#B5A8A1"}}/>
                    <button type="button" style={{backgroundColor: "#AB844A"}}/>
                    <button type="button" style={{backgroundColor: "#6977F0"}}/>
                    <button type="button" style={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #D1D1D1"
                    }}/>
                    <button type="button" style={{backgroundColor: "#141414"}}/>
                    <button type="button" style={{backgroundColor: "#FF0000"}}/>
                </div>
            </div>
        </div>
    );
};


const FavButton = ({isFavorite, onClick}) => {

    // TODO: получается click area немного выходит за иконку, потому что div прямоугольной формы
    return (
        <div className={css.favoriteButton} onClick={onClick}>
            {
                isFavorite
                    ? <img src={filledHearIcon} alt="filledHearIcon"/>
                    : <img src={emptyHeartIcon} alt="emptyHeartIcon"/>
            }
        </div>
    );
}