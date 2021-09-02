export const addToCart = (item) => {
    return {
        type: "@cart/ADD",
        item,
    };
};

export const removeFromCart = (item) => {
    return {
        type: "@cart/REMOVE",
        item,
    };
};

export const updateAmount = (sku, amount) => {
    return {
        type: "@cart/UPDATE_AMOUNT",
        sku,
        amount,
    };
};

