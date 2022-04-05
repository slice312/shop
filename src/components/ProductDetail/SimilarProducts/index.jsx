import React from "react";
import css from "./styles.module.scss";
import {Api} from "src/shared/utils/api";
import {ProductCard} from "../../../shared/components/ProductCard";


export const SimilarProducts = ({collectionId}) => {
    const [products, setProducts] = React.useState([]);
    console.log("SimilarProducts", collectionId);

    React.useEffect(() => {
        console.log("EFFECT", collectionId);
        if (!collectionId)
            return;
        (async () => {
            try {
                const response = await Api.getProductsByCollection(collectionId, 5, 0);
                if (response.status === 200) {
                    console.log("getProductsByCollection success");
                    setProducts(response.data);
                    console.log(response.data);
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
            <div className={css.container}>
                {
                    products.map((x, i) => {
                        return (
                            <ProductCard {...x}/>
                        );
                    })

                }
            </div>
        </div>

    );
};