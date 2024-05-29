import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import PublicationCard from "../../components/PublicationCard"; // Adjust the import path as necessary
import { BACKEND_ROUTE } from "../../scripts/constants";
import {
  axiosGetPublicationViewPublication,
  axiosGetPublicationViewPublicationWithError,
} from "./BackEndStub";
import PublicationView from "../PublicationView";
jest.mock("axios");

jest.mock("../../components/ClientWindow", () => ({ children }) => (
  <div>{children}</div>
));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe("PublicationView component", () => {
  it("Renders the category of the publication correctly in the component when there isnt an error", async () => {
    axiosGetPublicationViewPublication();
    await act(async () => {
      render(
        <Router>
          <PublicationView />
        </Router>
      );
    });
    expect(screen.getByText("News")).toBeInTheDocument();
  });
  it("Renders the description of the publication correctly in the component when there isnt an error", async () => {
    axiosGetPublicationViewPublication();
    await act(async () => {
      render(
        <Router>
          <PublicationView />
        </Router>
      );
    });
    expect(
      screen.getByText("Sample description for the publication card")
    ).toBeInTheDocument();
  });
  it("Renders the date of the publication correctly on the component if there wasnt an error", async () => {
    axiosGetPublicationViewPublication();
    await act(async () => {
      render(
        <Router>
          <PublicationView />
        </Router>
      );
    });
    expect(screen.getByText("5/28/2024")).toBeInTheDocument();
  });

  it("Renders the keywords of the publication correctly on the component if there wasnt an error", async () => {
    axiosGetPublicationViewPublication();
    await act(async () => {
      render(
        <Router>
          <PublicationView />
        </Router>
      );
    });
    expect(screen.getByText("azul, rojo, verde")).toBeInTheDocument();
  });

  it("Doesnt render the category of the publication in the component when there is an error", async () => {
    axiosGetPublicationViewPublicationWithError();
    await act(async () => {
      render(
        <Router>
          <PublicationView />
        </Router>
      );
    });
    expect(screen.queryByText(/News/)).toBeNull();
  });
  it("Doesnt render the description of the publication in the component when there is an error", async () => {
    axiosGetPublicationViewPublicationWithError();
    await act(async () => {
      render(
        <Router>
          <PublicationView />
        </Router>
      );
    });
    expect(
      screen.queryByText(/Sample description for the publication card/)
    ).toBeNull();
  });
  it("Doesnt render the date of the publication on the component if there wasn an error", async () => {
    axiosGetPublicationViewPublicationWithError();
    await act(async () => {
      render(
        <Router>
          <PublicationView />
        </Router>
      );
    });
    expect(screen.queryByText(/5\/28\/2024/)).toBeNull();
  });

  it("Doesnt render the keywords of the publication on the component if there was an error", async () => {
    axiosGetPublicationViewPublicationWithError();
    await act(async () => {
      render(
        <Router>
          <PublicationView />
        </Router>
      );
    });
    expect(screen.queryByText(/azul, rojo, verde/)).toBeNull();
  });

  it("The component is rendered in an acceptable time for the user (0 to 5 seconds) when there isnt an error", async () => {
    const renderTimeRangeMin = 0; // 0 segundos
    const renderTimeRangeMax = 5000; // 5 segundos

    let renderStartTime;
    let renderEndTime;
    renderStartTime = Date.now();
    axiosGetPublicationViewPublication();
    await act(async () => {
      render(
        <Router>
          <PublicationView />
        </Router>
      );
    });
    renderEndTime = Date.now();

    const renderingTimeSeconds = (renderEndTime - renderStartTime) / 1000;

    // Ver que el tiempo de renderizado caiga entre los dos límites
    expect(renderingTimeSeconds).toBeGreaterThanOrEqual(renderTimeRangeMin);
    expect(renderingTimeSeconds).toBeLessThanOrEqual(renderTimeRangeMax);
  });

  it("The component is rendered in an acceptable time for the user (0 to 5 seconds) when there is an error", async () => {
    const renderTimeRangeMin = 0; // 0 segundos
    const renderTimeRangeMax = 5000; // 5 segundos

    let renderStartTime;
    let renderEndTime;
    renderStartTime = Date.now();
    axiosGetPublicationViewPublicationWithError();
    await act(async () => {
      render(
        <Router>
          <PublicationView />
        </Router>
      );
    });
    renderEndTime = Date.now();

    const renderingTimeSeconds = (renderEndTime - renderStartTime) / 1000;

    // Ver que el tiempo de renderizado caiga entre los dos límites
    expect(renderingTimeSeconds).toBeGreaterThanOrEqual(renderTimeRangeMin);
    expect(renderingTimeSeconds).toBeLessThanOrEqual(renderTimeRangeMax);
  });
});
