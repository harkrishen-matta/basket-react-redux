import api from "../../../services/api";

export const GetProducts = () => {
    return dispatch => {
        api.get("/products")
            .then(res => {
                dispatch({
                    type: "GET_PRODUCTS",
                    products: res.data
                });
            });
    };
};

export const Checkout = (body) => {
    return dispatch => {
        api.post('/checkout', body)
            .then(res => {
                console.log(res);
                dispatch({
                    type: "CHECKOUT",
                    checkoutMessage: res.data.msg
                })
            }).catch(error => {
                dispatch({
                    type: "CHECKOUT",
                    checkoutMessage: error.response.data.error
                });
        });
    }

};
