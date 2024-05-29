// CartPayment.test.js
/* eslint-disable */
import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProductViewer from "../ProductViewer";
import ProductCard from "../../components/ProductCard";
import { axiosGetProductViewerProducts } from "./BackEndStub";
import { BACKEND_ROUTE } from "../../scripts/constants"; // Adjust the import path as necessary

jest.mock("axios");

jest.mock("../../components/ClientWindow", () => ({ children }) => (
  <div>{children}</div>
));
jest.mock("../../components/AdminWindow", () => ({ children }) => (
  <div>{children}</div>
));
jest.mock("react-router-dom", () => ({
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
}));

describe("ProductViewer component", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("Renders the product name correctly inside the product viewer for a non-admin user", async () => {
    axiosGetProductViewerProducts();
    await act(async () => {
      render(<ProductViewer forUser="user" />);
    });
    expect(screen.getByText("Product 1")).toBeInTheDocument();
  });

  it("Renders the product price correctly inside the product viewer for a non-admin user", async () => {
    axiosGetProductViewerProducts();
    await act(async () => {
      render(<ProductViewer forUser="user" />);
    });
    expect(screen.getByText("₡1,000")).toBeInTheDocument();
  });

  it("Renders  the product image with correct src inside the product viewer for a non-admin user", async () => {
    axiosGetProductViewerProducts();
    await act(async () => {
      render(<ProductViewer forUser="user" />);
    });
    const firstImage = screen.getAllByRole("img")[0];
    expect(firstImage).toHaveAttribute(
      "src",
      `${BACKEND_ROUTE}/images/product.jpg`
    );
  });

  it("Renders the product image with the correct link to the product for a non-admin user", async () => {
    axiosGetProductViewerProducts();
    await act(async () => {
      render(<ProductViewer forUser="user" />);
    });
    const links = screen.queryAllByText((content, element) => {
      return element.tagName.toLowerCase() === "a";
    });

    let link = links[0];
    expect(link).toHaveAttribute("to", "/view_product/1");
  });

  it("Renders the product name correctly inside the product viewer for an admin user", async () => {
    axiosGetProductViewerProducts();
    await act(async () => {
      render(<ProductViewer forUser="admin" />);
    });
    expect(screen.getByText("Product 1")).toBeInTheDocument();
  });

  it("Renders the product price correctly inside the product viewer for an admin user", async () => {
    axiosGetProductViewerProducts();
    await act(async () => {
      render(<ProductViewer forUser="admin" />);
    });
    expect(screen.getByText("₡1,000")).toBeInTheDocument();
  });

  it("Renders  the product image with correct src inside the product viewer for an admin user", async () => {
    axiosGetProductViewerProducts();
    await act(async () => {
      render(<ProductViewer forUser="admin" />);
    });
    const firstImage = screen.getAllByRole("img")[0];
    expect(firstImage).toHaveAttribute(
      "src",
      `${BACKEND_ROUTE}/images/product.jpg`
    );
  });

  it("Renders the product image with the correct link to the product for an admin user", async () => {
    axiosGetProductViewerProducts();
    await act(async () => {
      render(<ProductViewer forUser="admin" />);
    });
    const links = screen.queryAllByText((content, element) => {
      return element.tagName.toLowerCase() === "a";
    });

    let link = links[0];
    expect(link).toHaveAttribute("to", "/edit_product/1");
  });
});
