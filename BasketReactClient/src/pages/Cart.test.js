import React from "react";
import {render, fireEvent} from "@testing-library/react";
import Home from "./Home";
import { Provider } from 'react-redux'
import store from "../store";
import Cart from "./Cart";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe("<Cart/>", () => {
    it("Renders without crashing", async () => {
        const { getByText } = render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );

        await sleep(2000);

        expect(getByText("Cart is empty")).toBeInTheDocument();

    });

    it("Add product to cart and render cart item", async () => {
        const { getByText, getByTestId} = render(
            <Provider store={store}>
                <Home />
                <Cart />
            </Provider>
        );

        await sleep(2000);

        fireEvent.click(getByTestId("add-1"));

        expect(getByTestId("cart-1")).toBeInTheDocument();

    });

    it("Place Order Button to be disabled when invalid - under 16 digit card num is entered ", async () => {
        const { getByText, getByTestId} = render(
            <Provider store={store}>
                <Home />
                <Cart />
            </Provider>
        );

        await sleep(2000);

        fireEvent.click(getByTestId("add-1"));

        const event = { target: { value: "453945646301951" } };

        fireEvent.change(getByTestId("cardNum-input"), event);
        expect(getByTestId("cardNum-input").value).toBe("453945646301951");
        expect(getByTestId("placeOrder").closest('button')).toBeDisabled();


    });


    it("Place Order Button to be enabled when valid card num is entered", async () => {
        const { getByText, getByTestId} = render(
            <Provider store={store}>
                <Home />
                <Cart />
            </Provider>
        );

        await sleep(2000);

        fireEvent.click(getByTestId("add-1"));

        const event = { target: { value: "4539456463019516" } };

        fireEvent.change(getByTestId("cardNum-input"), event);
        expect(getByTestId("cardNum-input").value).toBe("4539456463019516");
        expect(getByTestId("placeOrder").closest('button')).not.toBeDisabled();


    });




});
