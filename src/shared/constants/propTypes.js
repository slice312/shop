import PropTypes from "prop-types";


export const BasketInfoPropType = PropTypes.shape({
    productsModelQty: PropTypes.number.isRequired,
    productsQty: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    discountAmount: PropTypes.number.isRequired
});


export const ProductInfoPropType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    collectionId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    vendorCode: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    qty: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    material: PropTypes.string.isRequired,
    fabricStructure: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
});