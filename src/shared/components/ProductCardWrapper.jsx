import {useDispatch} from "react-redux";
import {productFavoriteToggle} from "src/shared/state/products/actions";
import {Utils} from "src/shared/utils";
import {ProductCard} from "src/shared/components/ProductCard";


export const ProductCardWrapper = ({product}) => {
    const dispatch = useDispatch();
    const {navigateToProductPage} = Utils.Hooks.useProjectNavigation();

    const redirectToProductPage = () => navigateToProductPage(product.id);
    const favoriteToggle = () => dispatch(productFavoriteToggle(product.id));

    return (
        <ProductCard product={product}
                     onFavoriteToggle={favoriteToggle}
                     onCardClick={redirectToProductPage}
        />
    );
};