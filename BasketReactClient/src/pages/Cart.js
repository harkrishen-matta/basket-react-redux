import React, {useState, useEffect, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import CartItem from "../components/cartItem";
import Button from "@material-ui/core/Button";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {Checkout} from "../store/modules/products/actions";

export default function Cart() {

    const history = useHistory();
    const toHome = useCallback(() => history.push("/"), [history]);

    const dispatch = useDispatch();


    const total = useSelector(state =>
        state.cart.reduce((total, item) => {
            total += item.amount * item.price;
            return total;
        }, 0)
    );

    const cart = useSelector(state => state.cart);

    const [cardNum, setCardNum] = useState("");
    const checkoutMessage = useSelector(state => state.products.checkoutMessage);
    const checkoutDialog = useSelector(state => state.products.checkoutDialog);

    const checkout = () => {
        let checkoutRequest = {
            "basket": cart.map(({sku, amount}) => ({sku, "quantity": amount})),
            "cardNumber": cardNum
        };

        dispatch(Checkout(checkoutRequest))


    };

    const handleTextFieldChange = (e) => {
        let value = e.target.value;
        setCardNum(value);
    };

    return (
        <div>
            {cart.length === 0 ? (
                <div>Cart is empty</div>
            ) : (
                <div>
                    {cart.map((cartItem) => (
                        <div key={cartItem.sku}>
                            <CartItem cartItem={cartItem}/>
                        </div>
                    ))}

                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        style={{padding: 20}}
                    >
                        <Grid item container direction="row" justify="flex-end" alignItems="center" spacing={2}>
                            <Grid item>
                                <h1 align="center">Total Price £{total.toFixed(2)}</h1>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" justify="flex-end" alignItems="center" spacing={2}>
                            <Grid item>
                                <Button variant="contained"
                                        color="secondary"
                                        startIcon={<ShoppingBasketIcon/>}
                                        disabled={cardNum.length < 16}
                                        onClick={() => checkout()}
                                        data-testid="placeOrder"
                                >
                                    Place Order
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained"
                                        color="secondary"
                                        startIcon={<ShoppingBasketIcon/>}

                                        onClick={() => toHome()}
                                >
                                    Continue Shopping
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <TextField inputProps={{ "data-testid": "cardNum-input" }}  id="outlined-basic" label="Input Your Card Number" variant="outlined"
                                       value={cardNum} onChange={(e) => handleTextFieldChange(e)}/>
                        </Grid>
                    </Grid>

                    <Dialog aria-labelledby="simple-dialog-title" open={checkoutDialog}>
                        <DialogTitle id="simple-dialog-title">Checking Out</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {checkoutMessage}
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </div>
            )}
        </div>
    );
}
