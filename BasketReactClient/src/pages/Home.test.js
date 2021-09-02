import React from "react";
import {render, fireEvent} from "@testing-library/react";
import Home from "./Home";
import { Provider } from 'react-redux'
import store from "../store";
import Header from "../components/header";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe("<Home/>", () => {


    it("Renders without crashing", async () => {
        const { getByText } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        await sleep(2000);

        expect(getByText("Checkout")).toBeInTheDocument();

    });

    it("Has an checkout button", async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        await sleep(2000);

        expect(getByTestId("checkout").textContent).toBe("Checkout");
    });

    it("Has 5 Products", async () => {
        const { queryAllByTestId } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        await sleep(2000);

        expect(queryAllByTestId("products").length).toBe(5);
    });

    it("Increment Basket Count", async () => {
        const { getByTestId, queryAllByTestId} = render(
            <Provider store={store}>
                <Header/>
                <Home />
            </Provider>
        );


        await sleep(2000);

        fireEvent.click(getByTestId("add-1"));

        expect(getByTestId("basket-button").textContent).toBe("1");
    });

    it("Increment Basket Count", async () => {
        const { getByTestId, queryAllByTestId} = render(
            <Provider store={store}>
                <Header/>
                <Home />
            </Provider>
        );


        await sleep(2000);

        fireEvent.click(getByTestId("add-1"));

        expect(getByTestId("basket-button").textContent).toBe("1");
    });


    it("Checkout button disabled when no items", async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        await sleep(2000);

        expect(getByTestId("checkout").closest('button')).toBeDisabled();
    });

    it("Checkout button not disabled when there a items in the cart", async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        await sleep(2000);

        fireEvent.click(getByTestId("add-1"));

        expect(getByTestId("checkout").closest('button')).not.toBeDisabled();
    });

    it("Product add to cart - Quantity Increment by 2 when clicked twice", async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        await sleep(2000);

        fireEvent.click(getByTestId("add-1"));
        fireEvent.click(getByTestId("add-1"));

        expect(getByTestId("add-1").textContent).toBe("Add to Cart 2");
    });

});
