import React from "react";
import {useParams} from "react-router-dom";
import {Api} from "src/shared/utils/api";
import {SimilarProducts} from "./SimilarProducts";
import {Description} from "./Description";
import css from "./styles.module.scss";


export const Product = () => {
    const params = useParams();
    const [product, setProduct] = React.useState({});
    const [isFavorite, setIsFavorite] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            try {
                const response = await Api.getProduct(params.id);
                if (response.status === 200) {
                    console.log("getProduct success");
                    setProduct(response.data);
                    setIsFavorite(response.data.isFavorite || false);
                } else {
                    console.error("getProduct error", response.status);
                }
            } catch (err) {
                console.error("getProduct error", err);
            }
        })();
    }, [params]);


    React.useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [product]);


    return (
        <div className={css.root}>
            <Description product={product}
                         isFavorite={isFavorite}
                         onChangedFavorite={x => setIsFavorite(x)}
            />
            <SimilarProducts collectionId={product.collectionId}/>
        </div>
    );
};