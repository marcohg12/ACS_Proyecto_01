import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import PublicationCard from "../../components/PublicationCard"; // Adjust the import path as necessary
import { BACKEND_ROUTE } from "../../scripts/constants";

describe("PublicationCard component", () => {
  const defaultProps = {
    photoPath: "/images/sample.jpg",
    description: "Sample description for the publication card",
    date: "2024-05-29",
    category: "News",
    toLink: "/publication/1",
  };

  const renderComponent = (props = {}) => {
    return render(
      <Router>
        <PublicationCard {...defaultProps} {...props} />
      </Router>
    );
  };

  it("renders the link with the correct 'to' attribute", () => {
    renderComponent();

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", defaultProps.toLink);
  });

  it("renders the image with the correct 'src' attribute", () => {
    renderComponent();

    const imgElement = screen.getByRole("img");
    expect(imgElement).toHaveAttribute(
      "src",
      BACKEND_ROUTE + defaultProps.photoPath
    );
  });

  it("renders the image with the correct 'alt' attribute", () => {
    renderComponent();

    const imgElement = screen.getByRole("img");
    expect(imgElement).toHaveAttribute("alt", "");
  });

  it("renders the description correctly", () => {
    renderComponent();

    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it("renders the date correctly", () => {
    renderComponent();

    expect(screen.getByText(defaultProps.date)).toBeInTheDocument();
  });

  it("renders the category correctly", () => {
    renderComponent();

    expect(screen.getByText(defaultProps.category)).toBeInTheDocument();
  });

  it("applies correct styling to the elements", () => {
    renderComponent();

    // Check the card container
    const cardContainer = screen.getByRole("link").firstChild;
    expect(cardContainer).toHaveClass("card");

    // Check the image container
    const imgContainer = cardContainer.firstChild;
    expect(imgContainer).toHaveStyle({
      height: "300px",
      overflow: "hidden",
      position: "relative",
    });

    // Check the image style
    const imgElement = screen.getByRole("img");
    expect(imgElement).toHaveStyle({
      objectFit: "cover",
      width: "100%",
      height: "100%",
    });

    // Check the card body
    const cardBody = cardContainer.lastChild;
    expect(cardBody).toHaveClass("card-body");
  });

  it("The component is rendered in an acceptable time for the user (0 to 5 seconds)", async () => {
    const renderTimeRangeMin = 0; // 0 segundos
    const renderTimeRangeMax = 5000; // 5 segundos

    let renderStartTime;
    let renderEndTime;
    renderStartTime = Date.now();
    renderComponent();
    renderEndTime = Date.now();

    const renderingTimeSeconds = (renderEndTime - renderStartTime) / 1000;

    // Ver que el tiempo de renderizado caiga entre los dos límites
    expect(renderingTimeSeconds).toBeGreaterThanOrEqual(renderTimeRangeMin);
    expect(renderingTimeSeconds).toBeLessThanOrEqual(renderTimeRangeMax);
  });
});
