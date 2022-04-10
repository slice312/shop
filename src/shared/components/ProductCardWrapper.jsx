import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {productFavoriteToggle} from "src/shared/state/products/actions";
import {ProductCard} from "src/shared/components/ProductCard";


export const ProductCardWrapper = ({product}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const favoriteToggle = () => dispatch(productFavoriteToggle(product.id));

    const redirectToProductPage = () => navigate(`/products/${product.id}`);

    return (
        <ProductCard product={product}
                     onFavoriteToggle={favoriteToggle}
                     onCardClick={redirectToProductPage}
        />
    );
};