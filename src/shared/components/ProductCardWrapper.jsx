import {ProductCard} from "src/shared/components/ProductCard";

// TODO: redux dispatch fav
export const ProductCardWrapper = ({...props}) => {
    return (
        <ProductCard {...props}/>
    );
};