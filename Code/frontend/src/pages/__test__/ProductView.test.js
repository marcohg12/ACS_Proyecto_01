// CartPayment.test.js
/* eslint-disable */
import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MessageModal from "../../components/MessageModal";
import ProductView from "../ProductView";
import ProductCard from "../../components/ProductCard";
import {
  axiosGetProductViewProduct,
  axiosGetProductViewProductWithError,
  axiosStubSendFormErrorEqualToFalseProductView,
  axiosStubSendFormErrorEqualToTrueProductView,
} from "./BackEndStub";
import { BrowserRouter as Router } from "react-router-dom";
import { BACKEND_ROUTE } from "../../scripts/constants"; // Adjust the import path as necessary
jest.mock(
  "../../components/MessageModal",
  () =>
    ({ message, is_open, close, error }) =>
      (
        <div data-testid="mocked-message-modal">
          {error ? (
            <div className="mocked-alert-danger">{message}</div>
          ) : (
            <div className="mocked-alert-success">{message}</div>
          )}
        </div>
      )
);

jest.mock("axios");

jest.mock("../../components/ClientWindow", () => ({ children }) => (
  <div>{children}</div>
));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe("ProductView component", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  it("Renders product name correctly when ther isnt an error", async () => {
    axiosGetProductViewProduct();
    await act(async () => {
      render(
        <Router>
          <ProductView />
        </Router>
      );
    });
    expect(screen.getByText("Product 1")).toBeInTheDocument();
  });

  it("Renders description correctly when there isnt an error", async () => {
    axiosGetProductViewProduct();
    await act(async () => {
      render(
        <Router>
          <ProductView />
        </Router>
      );
    });
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("Renders price correctly when there isnt an error", async () => {
    axiosGetProductViewProduct();
    await act(async () => {
      render(
        <Router>
          <ProductView />
        </Router>
      );
    });
    expect(screen.getByText("₡1,000")).toBeInTheDocument();
  });

  it("Renders url of photo inside image correctly when there isnt an error", async () => {
    axiosGetProductViewProduct();
    await act(async () => {
      render(
        <Router>
          <ProductView />
        </Router>
      );
    });
    const firstImage = screen.getAllByRole("img")[0];
    expect(firstImage).toHaveAttribute(
      "src",
      `${BACKEND_ROUTE}/images/product.jpg`
    );
  });

  it("Doesnt render the name of the product when there is an error", async () => {
    axiosGetProductViewProductWithError();
    await act(async () => {
      render(
        <Router>
          <ProductView />
        </Router>
      );
    });
    expect(screen.queryByText(/Product 1/)).toBeNull();
  });

  it("Doesnt render the description of the product when there is an error", async () => {
    axiosGetProductViewProductWithError();
    await act(async () => {
      render(
        <Router>
          <ProductView />
        </Router>
      );
    });
    expect(screen.queryByText(/Test description/)).toBeNull();
  });
  it("Doesnt render the price of the product when there is an error", async () => {
    axiosGetProductViewProductWithError();
    await act(async () => {
      render(
        <Router>
          <ProductView />
        </Router>
      );
    });
    expect(screen.queryByText(/₡1,000/)).toBeNull();
  });

  it("Verifies that when changing the input, it is reflected in the component", async () => {
    axiosGetProductViewProduct();
    await act(async () => {
      render(
        <Router>
          <ProductView />
        </Router>
      );
    });
    const inputElement = screen.getByRole("spinbutton");

    // Simulate user interaction by changing the input value
    fireEvent.change(inputElement, { target: { value: "5" } });

    // Assert that the input value has changed
    expect(inputElement).toHaveValue(5);
  });

  it("Renders the success message after submitting the form returns with a non-error code", async () => {
    axiosGetProductViewProduct();
    await act(async () => {
      render(
        <Router>
          <ProductView />
        </Router>
      );
    });

    // Simulate changing the input value
    const inputElement = screen.getByRole("spinbutton");
    fireEvent.change(inputElement, { target: { value: "5" } });

    // Mock the Axios request to return a successful response
    axiosStubSendFormErrorEqualToFalseProductView();

    // Simulate submitting the form
    await act(async () => {
      fireEvent.submit(screen.getByTestId("productViewForm"));
    });

    // Assert that the success message is rendered
    expect(
      screen.getByText("Producto agregado al carrito")
    ).toBeInTheDocument();
  });

  it("Renders the fail message after submitting the form returns with an error-code", async () => {
    axiosGetProductViewProduct();
    await act(async () => {
      render(
        <Router>
          <ProductView />
        </Router>
      );
    });

    // Simulate changing the input value
    const inputElement = screen.getByRole("spinbutton");
    fireEvent.change(inputElement, { target: { value: "5" } });

    // Mock the Axios request to return a successful response
    axiosStubSendFormErrorEqualToTrueProductView();

    // Simulate submitting the form
    await act(async () => {
      fireEvent.submit(screen.getByTestId("productViewForm"));
    });

    // Assert that the success message is rendered
    expect(
      screen.getByText("Ocurrió un error inesperado, intente de nuevo")
    ).toBeInTheDocument();
  });
});
