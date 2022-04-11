import React from "react";
import PropTypes from "prop-types";
import {Carousel} from "react-bootstrap";
import filledHearIcon from "src/assets/icons/filled-heart.svg";
import emptyHeartIcon from "src/assets/icons/empty-heart.svg";
import "./styles.scss";


const propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        discount: PropTypes.number.isRequired,
        isFavorite: PropTypes.bool.isRequired,
        size: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        colors: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
};

export const ProductCard = (    {
        product,
        onFavoriteToggle,
        onCardClick
    }) => {

    const {
        id,
        title,
        price,
        discount,
        isFavorite,
        size,
        images,
        colors} = product

    const priceWithDiscount = Math.round(price - price * discount / 100);
    const roundedDiscount = Math.round(discount);

    return (
        <div className="card__container">
            <div className="photo">
                <ImageSlides images={images} onClick={onCardClick}/>
                {
                    (roundedDiscount > 0)
                        ? <DiscountBadge discount={roundedDiscount}/>
                        : null
                }
                <FavButton isFavorite={isFavorite} onClick={onFavoriteToggle}/>
            </div>

            <div className="description" onClick={onCardClick}>
                <div className="title">
                    {title}
                </div>
                <div className="priceDiv">
                    <span className="price">{priceWithDiscount} c</span>
                    {
                        (roundedDiscount > 0)
                            ? <span className="oldPrice">{price} c</span>
                            : null
                    }
                </div>
                <div className="size">
                    Размер: {size}
                </div>
                <div className="colors">
                    {
                        colors.map((x, i) =>
                            <button key={i} type="button" style={{backgroundColor: x}}/>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = propTypes;

const ImageSlides = ({images, onClick}) => {
    if (images.length === 1) {
        const img = images[0];
        return (
            <img className="image" src={img} alt={img} onClick={onClick}/>
        );
    }
    return (
        <Carousel interval={null} controls={false} >
            {
                images.map((x, i) => {
                    return (
                        <Carousel.Item key={i}>
                            <img className="image" src={x} alt={x} onClick={onClick}/>
                        </Carousel.Item>
                    );
                })
            }
        </Carousel>
    );
};


const FavButton = ({isFavorite, onClick}) => {
    // TODO: получается click area немного выходит за иконку, потому что div прямоугольной формы
    return (
        <div className="favoriteButton" onClick={onClick}>
            {
                isFavorite
                    ? <img src={filledHearIcon} alt="filledHearIcon"/>
                    : <img src={emptyHeartIcon} alt="emptyHeartIcon"/>
            }
        </div>
    );
}

const DiscountBadge = ({discount}) => {
    return (
        <div className="discountBadge">
            <div className="discountTriangle"/>
            <div className="discountValue">{discount}%</div>
        </div>
    );
};

