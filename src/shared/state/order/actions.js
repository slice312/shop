import {
    ORDER_CALCULATE_RESET,
    ORDER_CALCULATE_SET
} from "src/shared/state/actionTypes";


export const orderCalculateReset = () => ({type: ORDER_CALCULATE_RESET})

/**
 * @param {OrderInfo} orderInfo
 */
export const orderCalculateSet = (orderInfo) => ({type: ORDER_CALCULATE_SET, payload: orderInfo})


export const calculateBasket = () => {
    return (dispatch, getState) => {
        dispatch(orderCalculateReset());

        const state = getState();
        const basketItems =  state.basket.items;
        const productsInfo = state.productsState.products;

        const productsModelQty = productsInfo.length;
        let productsQty = 0;
        let amount = 0;
        let discountAmount = 0

        for (const item of basketItems) {
            productsQty += item.qty;
            const info = productsInfo.find(x => x.product.id === item.productId)
            if (info) {
                amount += info.product.price * item.qty;
                discountAmount += info.product.price * info.product.discount / 100 * item.qty;
            }
        }

        dispatch(orderCalculateSet({
            productsModelQty,
            productsQty,
            amount,
            discountAmount
        }));
    };
};