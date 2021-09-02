const INITIAL_STATE = {
    Products: [],
    loading: true,
    checkoutMessage: 'Hello',
    checkoutDialog: false,
};
export default function products(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "GET_PRODUCTS": {
            return {
                ...state,
                Products: action.products,
                loading: false
            };
        }
        case "CHECKOUT": {
            return {
                ...state,
                checkoutMessage: action.products,
                checkoutDialog: true
            };
        }
        default:
            return state;
    }
}
