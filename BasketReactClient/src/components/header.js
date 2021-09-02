import React, {useCallback} from "react";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import Badge from "@material-ui/core/Badge";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header() {
    const classes = useStyles();

    const cartItemsCount = useSelector(state => {
            let count = 0;
            state.cart.forEach(cartItem => count += cartItem.amount);
            return count;
        }
    );
    const history = useHistory();
    const toCheckout = useCallback(() => history.push("/cart"), [history]);
    const toHome = useCallback(() => history.push("/"), [history]);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} onClick={() => toHome()}>
                        Zilch Shopping
                    </Typography>
                    <IconButton data-testid="basket-button" onClick={() => toCheckout()} edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Badge badgeContent={cartItemsCount} color="secondary">
                            <ShoppingBasketIcon/>
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
