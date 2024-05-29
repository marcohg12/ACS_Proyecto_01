// CartPayment.test.js
/* eslint-disable */
import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { BACKEND_ROUTE } from "../../scripts/constants"; // Adjust the import path as necessary

// Mock data
const mockProps = {
  photoPath: "/images/product.jpg",
  name: "Test Product",
  price: 1000,
  toLink: "/product/1",
};

describe("ProductCard Component", () => {
  //Test 1 product card
  it("should render the product name correctly", async () => {
    await act(async () => {
      render(
        <Router>
          <ProductCard {...mockProps} />
        </Router>
      );
    });

    // Check if the name is rendered
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  //Test 2 product card
  it("should render the product price correctly", () => {
    const { getByText } = render(
      <Router>
        <ProductCard {...mockProps} />
      </Router>
    );

    // Check if the price is rendered correctly
    expect(getByText("₡1,000")).toBeInTheDocument();
  });

  //Test 3 product card
  it("should render the product image with correct src", () => {
    const { getByAltText } = render(
      <Router>
        <ProductCard {...mockProps} />
      </Router>
    );

    // Check if the image is rendered with the correct src
    const img = getByAltText("");
    expect(img).toHaveAttribute(
      "src",
      `${BACKEND_ROUTE}${mockProps.photoPath}`
    );
  });

  //Test 4 product card
  it("should render the link with the correct href", () => {
    const { container } = render(
      <Router>
        <ProductCard {...mockProps} />
      </Router>
    );

    // Check if the link is rendered with the correct href
    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", mockProps.toLink);
  });

  it("The component is rendered in an acceptable time for the user (0 to 5 seconds)", async () => {
    const renderTimeRangeMin = 0; // 0 segundos
    const renderTimeRangeMax = 5000; // 5 segundos

    let renderStartTime;
    let renderEndTime;
    renderStartTime = Date.now();
    await act(async () => {
      <Router>
        <ProductCard {...mockProps} />
      </Router>;
    });
    renderEndTime = Date.now();

    const renderingTimeSeconds = (renderEndTime - renderStartTime) / 1000;

    // Ver que el tiempo de renderizado caiga entre los dos límites
    expect(renderingTimeSeconds).toBeGreaterThanOrEqual(renderTimeRangeMin);
    expect(renderingTimeSeconds).toBeLessThanOrEqual(renderTimeRangeMax);
  });
});
