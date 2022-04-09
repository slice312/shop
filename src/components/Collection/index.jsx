import React from "react";
import {useParams} from "react-router-dom";
import {Api} from "src/shared/utils/api";
import css from "./styles.module.scss";
import {CardsView} from "src/shared/components/CardsView";
import {ProductCardWrapper} from "src/shared/components/ProductCardWrapper";
import {PaginationControl} from "src/shared/components/PaginationControl";


const PRODUCTS_BATCH_SIZE = 12;

export const Collection = () => {
    const params = useParams();
    const [products, setProducts] = React.useState([]);
    const [pageIndex, setPageIndex] = React.useState(0);
    let totalPageQty = 0;

    React.useEffect(() => {
        (async () => {
            try {
                const response = await Api.getProductsByCollection(params.id, PRODUCTS_BATCH_SIZE, 0);
                if (response.status === 200) {
                    console.log("getProductsByCollection success");
                    setProducts(response.data.products);
                    totalPageQty = response.data.totalQty; // TODO: всчего количество итемов, rename
                } else {
                    console.error("getProductsByCollection error", response.status);
                }
            } catch (err) {
                console.error("getProductsByCollection error", err);
            }
        })();
    }, [params]);




    return (
        <div className={css.root}>
            <div className={css.title}>
                Коллекции
            </div>
            <CardsView cards={products} CardElement={ProductCardWrapper}/>
            <div className={css.paginator}>
                <PaginationControl
                    pageSize={PRODUCTS_BATCH_SIZE}
                    totalItemsQty={totalPageQty}
                    activeItemIndex={pageIndex}
                    onActiveItemChanged={i => setPageIndex(i)}
                />
            </div>
        </div>
    );
};