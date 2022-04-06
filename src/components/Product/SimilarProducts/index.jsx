import React from "react";
import lo from "lodash";
import {Api} from "src/shared/utils/api";
import {ProductCard} from "src/shared/components/ProductCard";
import css from "./styles.module.scss";


const PRODUCTS_LIMIT = 5;


export const SimilarProducts = ({collectionId}) => {
    const [products, setProducts] = React.useState([]);

    // TODO: не знаю надо ли все пихать в redux и запрос в thunk, пока сделал тут потому что времени нет
    React.useEffect(() => {
        if (!collectionId)
            return;
        (async () => {
            try {
                const response = await Api.getProductsByCollection(collectionId, PRODUCTS_LIMIT, 0);
                if (response.status === 200) {
                    console.log("getProductsByCollection success");
                    setProducts(response.data);
                } else {
                    console.error("getProductsByCollection error", response.status);
                }
            } catch (err) {
                console.error("getProductsByCollection error", err);
            }
        })();
    }, [collectionId]);


    return (
        <div className={css.root}>
            <div className={css.title}>
                Похожие товары
            </div>
            <div className={css.cardContainer}>
                {
                    lo.take(products, PRODUCTS_LIMIT)
                        .map((x, i) => <ProductCard key={i} {...x}/>)
                }
            </div>
        </div>
    );
};