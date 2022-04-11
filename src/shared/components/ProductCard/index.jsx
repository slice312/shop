import React from "react";
import PropTypes from "prop-types";
import {ImageSlides} from "./ImageSlides";
import css from "./styles.module.scss";
import filledHearIcon from "src/assets/icons/filled-heart.svg";
import emptyHeartIcon from "src/assets/icons/empty-heart.svg";


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
    }).isRequired,
    onFavoriteToggle: PropTypes.func,
    onCardClick: PropTypes.func
};

export const ProductCard = ({product, onFavoriteToggle, onCardClick}) => {
    const {
        id,
        title,
        price,
        discount,
        isFavorite,
        size,
        images,
        colors
    } = product

    const priceWithDiscount = Math.round(price - price * discount / 100);
    const roundedDiscount = Math.round(discount);


    return (
        <div className={css.root}>
            <div className={css.photo}>
                <ImageSlides images={images} onClick={onCardClick}/>
                {
                    (roundedDiscount > 0)
                        ? <DiscountBadge discount={roundedDiscount}/>
                        : null
                }
                <FavButton isFavorite={isFavorite} onClick={onFavoriteToggle}/>
            </div>

            <div className={css.description} onClick={onCardClick}>
                <div className={css.title}>
                    {title}
                </div>
                <div className={css.priceDiv}>
                    <span className={css.price}>{priceWithDiscount} c</span>
                    {
                        (roundedDiscount > 0)
                            ? <span className={css.oldPrice}>{price} c</span>
                            : null
                    }
                </div>
                <div className={css.size}>
                    Размер: {size}
                </div>
                <div className={css.colors}>
                    {
                        colors.map((x, i) =>
                            <div key={i} className={css.button} style={{backgroundColor: x}}/>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = propTypes;


const FavButton = ({isFavorite, onClick}) => {
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

FavButton.propTypes = {
    isFavorite: PropTypes.bool.isRequired,
    onClick: PropTypes.func
};


const DiscountBadge = ({discount}) => {
    return (
        <div className={css.discountBadge}>
            <div className={css.discountTriangle}/>
            <div className={css.discountValue}>{discount}%</div>
        </div>
    );
};

DiscountBadge.propTypes = {
    discount: PropTypes.number.isRequired
};