import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import * as CartActions from "../store/modules/cart/actions";
import {useDispatch} from "react-redux";



export default function CartItem(props) {

    const dispatch = useDispatch();

    const increment = item => {
        dispatch(CartActions.updateAmount(item.sku, item.amount + 1));
    };

    const decrement = item => {
        dispatch(CartActions.updateAmount(item.sku, item.amount - 1));
    };

    const removeFromCart = item => {
        dispatch(CartActions.removeFromCart(item));
    };

    const itemTotal = item => {
        let itemTotal = item.amount * item.price;
        return itemTotal.toFixed(2);
    };


    return (
        <Paper data-testid={`cart-${props.cartItem.sku}`} elevation={2} style={{margin: 50}}>
            <Grid
                container
                direction="row"
                spacing={5}
                justify="space-around"
                alignItems="center"

            >
                <Grid item direction="column">
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.cartItem.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.cartItem.description}
                    </Typography>
                </Grid>
                <Grid item direction="row">
                    <Grid item>
                        <IconButton size="small" onClick={() => increment(props.cartItem)}> <AddIcon/> </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography>
                            {props.cartItem.amount}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton size="small" onClick={() => decrement(props.cartItem)}> <RemoveIcon/> </IconButton>
                    </Grid>
                </Grid>
                <Grid item direction="column">
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.cartItem.price}
                    </Typography>
                </Grid>
                <Grid item direction="column">
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`£ ${itemTotal(props.cartItem)}`}
                    </Typography>
                </Grid>
                <Grid item direction="column">
                    <IconButton onClick={() => removeFromCart(props.cartItem)}>
                        <DeleteIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>

    );
}
