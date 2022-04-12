import React from "react";
import {Utils} from "src/shared/utils";
import {Modal} from "react-bootstrap";
import cn from "classnames";
import lo from "lodash";
import css from "./styles.module.scss"
import shoppingBagIcon from "src/assets/icons/shopping-bag-white.svg";
import filledHeartIcon from "src/assets/icons/filled-heart-white.svg";
import emptyHeartIcon from "src/assets/icons/empty-heart-white.svg";


export const Description = ({product, onChangedFavorite}) => {
    const {navigateToBasket} = Utils.Hooks.useProjectNavigation();
    const [selectedImage, setSelectedImage] = React.useState("");
    const [selectedColor, setSelectedColor] = React.useState("");
    const [inBasket, setInBasket] = React.useState(false); // TODO: после реализации устанавливать по local storage

    React.useEffect(() => {
        if (product.colors?.length)
            setSelectedColor(product.colors[0]);
    }, [product])

    const openImage = (imgSrc) => setSelectedImage(imgSrc);

    // TODO: реализовать добавление в корзину
    const addRemoveFromBasket = () => {
        console.log("addRemoveFromBasket");
        if (inBasket)
            navigateToBasket();
        setInBasket(true);
    };
    
    const priceWithDiscount = Math.round(product.price - product.price * product.discount / 100);


    return (
        <React.Fragment>
            <div className={css.root}>
                <div className={css.column1}>
                    {
                        lo.take(product.images, 8)
                            .map((x, i) =>
                                <img key={i} src={x} alt={x} onClick={() => openImage(x)}/>
                            )
                    }
                </div>
                <div className={css.column2}>
                    <div className={css.title}>
                        {product.title}
                    </div>
                    <div className={css.vendor}>
                        <span className={css.vendorLabel}>Артикул:</span>
                        <span className={css.vendorValue}>{product.vendorCode}</span>
                    </div>
                    <div className={css.color}>
                        <span className={css.colorLabel}>Цвет:</span>
                        <span className={css.colorButtons}>
                        {
                            product.colors?.map((x, i) =>
                                <div key={i} className={cn(css.buttonDiv, x === selectedColor ? css.active : null)}>
                                    <button type="button"
                                            style={{backgroundColor: x}}
                                            onClick={() => setSelectedColor(x)}
                                    />
                                </div>
                            )
                        }
                    </span>
                    </div>
                    <div className={css.price}>
                        <span>{priceWithDiscount || 0}</span>
                        <span className={css.oldPrice}>{product.price || 0} с</span>
                    </div>
                    <div className={css.description}>
                        <div className={css.title}>О товаре:</div>
                        <div className={css.text}>{product.description}</div>
                    </div>
                    <div className={css.props}>
                        <div>
                            <div>
                                <span className={css.propsLabel}>Размерный ряд:</span>
                                <span className={css.propsValue}>{product.size}</span>
                            </div>
                            <div>
                                <span className={css.propsLabel}>Количество в линейке:</span>
                                <span className={css.propsValue}>{product.qty}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span className={css.propsLabel}>Состав ткани:</span>
                                <span className={css.propsValue}>{product.fabricStructure}</span>
                            </div>
                            <div>
                                <span className={css.propsLabel}>Материал:</span>
                                <span className={css.propsValue}>{product.material}</span>
                            </div>
                        </div>
                    </div>
                    <div className={css.buttons}>
                        <div className={cn(css.buttonShoppingBag, css.buttonHovered)}
                             onClick={addRemoveFromBasket}
                        >
                            <img src={shoppingBagIcon} alt="shoppingBagIcon"/>
                            <span>
                                {inBasket ? "Перейти в корзину" : "Добавить в корзину"}
                            </span>
                        </div>
                        <div className={cn(css.buttonFavorite, css.buttonHovered)} onClick={onChangedFavorite}>
                            {
                                product.isFavorite
                                    ? <img src={filledHeartIcon} alt="filledHeartIcon"/>
                                    : <img src={emptyHeartIcon} alt="emptyHeartIcon"/>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                <Modal show={!!selectedImage}
                       onHide={() => setSelectedImage("")}>
                    <img src={selectedImage} alt={selectedImage}/>
                </Modal>
            }
        </React.Fragment>
    );
};