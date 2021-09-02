import React, { useEffect, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import * as CartActions from "../store/modules/cart/actions";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import {GetProducts} from "../store/modules/products/actions";


export default function Home() {
    const products = useSelector(state => state.products.Products);
    const loading = useSelector(state => state.products.loading);
    const amount = useSelector(state =>
        state.cart.reduce((sumAmount, item) => {
            sumAmount[item.sku] = item.amount;
            return sumAmount;
        }, {})
    );
    useEffect(() => {
        dispatch(GetProducts());
    }, []);

    const handleAddCart = item => {
        dispatch(CartActions.addToCart(item));
    };

    const history = useHistory();
    const toCheckout = useCallback(() => history.push("/cart"), [history]);

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);

    return (
        <div>
            {loading ? (
                <div>Products are loading</div>
            ) : (
                <div>
                    {products.map((product) => (
                            <List key={product.sku} data-testid="products" >
                                <ListItem button>
                                    <ListItemIcon>
                                        <InboxIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={product.name} secondary={product.description}/>
                                    <ListItemText primary={`Price: £${product.price}`}/>
                                    <ListItemSecondaryAction>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleAddCart(product)}
                                            startIcon={<AddCircleOutlineIcon/>}
                                            data-testid={`add-${product.sku}`}
                                        >
                                            Add to Cart {amount[product.sku] || 0}
                                        </Button>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                    ))}

                    <Button data-testid="checkout" disabled={cart.length === 0} onClick={() => toCheckout()}>Checkout</Button>

                </div>
            )
            }
        </div>
    );

}
