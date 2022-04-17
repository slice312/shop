import PropTypes from "prop-types";


export const BasketInfoPropType = PropTypes.shape({
    productsModelQty: PropTypes.number,
    productsQty: PropTypes.number,
    amount: PropTypes.number,
    discountAmount: PropTypes.number
});