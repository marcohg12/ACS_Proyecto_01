// CartPayment.test.js
/* eslint-disable */
import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CartView from "../CartView";
import MessageModal from "../../components/MessageModal";
import {
  axiosStubGetIncreaseProductErrorEqualToFalse,
  axiosStubGetIncreaseProductErrorEqualToTrue,
  axiosStubGetWithErrorEqualToFalse,
  axiosStubGetWithErrorEqualToTrue,
  testingSomethingFunney,
  axiosStubGetDecreaseProductErrorEqualToFalse,
  axiosStubGetDecreaseProductErrorEqualToTrue,
} from "./BackEndStub"; // Import helper functions

jest.mock("axios");
jest.mock("../../components/MessageModal");
jest.mock("../../components/ClientWindow", () => ({ children }) => (
  <div>{children}</div>
));
jest.mock("react-router-dom", () => ({
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
}));
jest.useFakeTimers();
describe("CartView component", () => {
  beforeEach(() => {
    jest.restoreAllMocks(); // Ensure axios mocks are cleared before each test
    MessageModal.mockImplementation(
      jest.requireActual("../../components/MessageModal").default
    );
  });
  //Test Case ID 1
  it("Renders name of each product correctly in the component", async () => {
    axiosStubGetWithErrorEqualToFalse();

    await act(async () => {
      render(<CartView />);
    });

    // Debugging

    //screen.debug();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });
  //Test Case ID 2
  it("Renders units of each product correctly in the component", async () => {
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartView />);
    });

    // Debugging

    //screen.debug();
    expect(screen.getByDisplayValue("5")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
  });

  //Test case ID 3
  it("Renders the price of each individual product", async () => {
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartView />);
    });

    // Debugging

    //screen.debug();
    expect(screen.getByText("₡10")).toBeInTheDocument();
    expect(screen.getByText("₡20")).toBeInTheDocument();
  });

  //Test Case id 4
  it("Renders the accumulated price of each product based on units and individual price", async () => {
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartView />);
    });

    // Debugging

    //screen.debug();
    expect(screen.getByText("₡50")).toBeInTheDocument();
    expect(screen.getByText("₡40")).toBeInTheDocument();
  });

  //Test case id 5
  it("Doesn't render the names of the products when there was an error on the back", async () => {
    axiosStubGetWithErrorEqualToTrue();
    await act(async () => {
      render(<CartView />);
    });

    // Debugging

    //screen.debug();
    expect(screen.queryByText("Product 1")).toBeNull();
    expect(screen.queryByText("Product 2")).toBeNull();
  });

  //Test Case ID 6
  it("Doesn't render units of each product when there was an error on the back", async () => {
    axiosStubGetWithErrorEqualToTrue();
    await act(async () => {
      render(<CartView />);
    });

    // Debugging

    //screen.debug();
    const inputElements = screen.queryAllByRole("input");
    expect(inputElements.length).toBe(0);
  });

  //Test case ID 7
  it("Doesn't render the price of each individual product when there was an error in the back", async () => {
    axiosStubGetWithErrorEqualToTrue();
    await act(async () => {
      render(<CartView />);
    });

    // Debugging

    //screen.debug();
    expect(screen.queryByText("₡10")).toBeNull();
    expect(screen.queryByText("₡20")).toBeNull();
  });

  //Test Case id 8
  it("Doesn't render the accumulated price of each product based on units and individual price when there is a backend error", async () => {
    axiosStubGetWithErrorEqualToTrue();
    await act(async () => {
      render(<CartView />);
    });
    // Debugging

    //screen.debug();
    expect(screen.queryByText("₡50")).toBeNull();
    expect(screen.queryByText("₡40")).toBeNull();
  });

  //Test Case id 9
  it("The component reloads the window with the new quantity of a product after increasing the product", async () => {
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartView />);
    });

    //Mock de la funcion reload de la pantalla
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    });
    await act(async () => {
      axiosStubGetIncreaseProductErrorEqualToFalse();
      const increaseButton = await screen.getAllByText("+")[1];
      fireEvent.click(increaseButton);
      //AXIOS.get != axios, en este se hace con el segundo
      //expect(axios).toBeCalledTimes(1);
    });
    //Para verificar que se volvio a recargar la ventana despues de hacer el incremento
    expect(window.location.reload).toHaveBeenCalled();
  });

  //Test case 10
  it("The component reloads itself with its state changed when there is an error increasing the product quantity", async () => {
    MessageModal.mockImplementation(({ message, is_open, error }) => (
      <>
        <div>
          {message} {is_open} {error}
        </div>
      </>
    ));
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartView />);
    });

    await act(async () => {
      axiosStubGetIncreaseProductErrorEqualToTrue();
      const increaseButton = await screen.getAllByText("+")[1];
      fireEvent.click(increaseButton);
    });

    expect(screen.getByText("Ha ocurrido un error")).toBeInTheDocument();
  });

  //Test Case id 11
  it("The component reloads the window with the new quantity of a product after decreasing the product", async () => {
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartView />);
    });

    //Mock de la funcion reload de la pantalla
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    });
    await act(async () => {
      axiosStubGetDecreaseProductErrorEqualToFalse();
      const decreaseButton = await screen.getAllByText("-")[1];
      fireEvent.click(decreaseButton);
      //AXIOS.get != axios, en este se hace con el segundo
      //expect(axios).toBeCalledTimes(1);
    });
    //Para verificar que se volvio a recargar la ventana despues de hacer el incremento
    expect(window.location.reload).toHaveBeenCalled();
  });

  //Test Case id 12
  it("The component reloads itself with its state changed when there is an error decreasing the product quantity", async () => {
    MessageModal.mockImplementation(({ message, is_open, error }) => (
      <>
        <div>
          {message} {is_open} {error}
        </div>
      </>
    ));
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartView />);
    });

    await act(async () => {
      axiosStubGetDecreaseProductErrorEqualToTrue();
      const decreaseButton = await screen.getAllByText("-")[1];
      fireEvent.click(decreaseButton);
    });

    expect(screen.getByText("Ha ocurrido un error")).toBeInTheDocument();
  });

  //Test Case id 13
  it("The function that handles the response sets the error state variable correctly.", async () => {
    MessageModal.mockImplementation(({ message, is_open, error }) => (
      <>{error ? <div>{message}</div> : <div></div>}</>
    ));
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartView />);
    });

    await act(async () => {
      axiosStubGetDecreaseProductErrorEqualToTrue();
      const decreaseButton = await screen.getAllByText("-")[1];
      fireEvent.click(decreaseButton);
    });

    expect(screen.getByText("Ha ocurrido un error")).toBeInTheDocument();
  });

  //Test Case id 14
  it("The function that handles the response sets the showModal state variable correctly", async () => {
    MessageModal.mockImplementation(({ message, is_open, error }) => (
      <>
        {error ? (
          <div data-testid="mock-modal" is_open={is_open.toString()}>
            <p>{is_open.toString()}</p>
          </div>
        ) : (
          <div>{message}</div>
        )}
      </>
    ));
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartView />);
    });

    await act(async () => {
      axiosStubGetDecreaseProductErrorEqualToTrue();
      const decreaseButton = await screen.getAllByText("-")[1];
      fireEvent.click(decreaseButton);
    });

    expect(screen.getByText("true")).toBeInTheDocument();
  });

  //Test Case id 15
  it("The function that handles the response sets the error state variable correctly", async () => {
    MessageModal.mockImplementation(({ message, is_open, error }) => (
      <>
        {error ? (
          <div data-testid="mock-modal" is_open={is_open.toString()}>
            {Message}
          </div>
        ) : (
          <div>
            <p>{error.toString()}</p>
          </div>
        )}
      </>
    ));
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartView />);
    });

    await act(async () => {
      axiosStubGetDecreaseProductErrorEqualToFalse();
      const decreaseButton = await screen.getAllByText("-")[1];
      fireEvent.click(decreaseButton);
    });

    expect(screen.getByText("false")).toBeInTheDocument();
  });

  //Test Case id 16
  it("The function that calculates the total cart price does so correctly", async () => {
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartView />);
    });

    expect(screen.getByText("Precio del carrito: ₡90"));
  });

  //Test Case id 17
  it("The component is rendered in an acceptable time for the user (0 to 5 seconds)", async () => {
    const renderTimeRangeMin = 0; // 0 segundos
    const renderTimeRangeMax = 5000; // 5 segundos

    axiosStubGetWithErrorEqualToFalse();
    let renderStartTime;
    let renderEndTime;
    renderStartTime = Date.now();
    await act(async () => {
      render(<CartView />);
    });
    renderEndTime = Date.now();

    const renderingTimeSeconds = (renderEndTime - renderStartTime) / 1000;

    // Ver que el tiempo de renderizado caiga entre los dos límites
    expect(renderingTimeSeconds).toBeGreaterThanOrEqual(renderTimeRangeMin);
    expect(renderingTimeSeconds).toBeLessThanOrEqual(renderTimeRangeMax);
  });

  //Test Case id 18
  it("The component is rendered in an acceptable time for the user when increasing a product (0 to 5 seconds)", async () => {
    const renderTimeRangeMin = 0; // 0 segundos
    const renderTimeRangeMax = 5000; // 5 segundos

    //Mock de la funcion reload de la pantalla
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    });

    axiosStubGetWithErrorEqualToFalse();
    let renderStartTime;
    let renderEndTime;
    await act(async () => {
      render(<CartView />);
    });

    renderStartTime = Date.now();
    await act(async () => {
      axiosStubGetIncreaseProductErrorEqualToFalse();
      const increaseButton = await screen.getAllByText("+")[1];
      fireEvent.click(increaseButton);
      //AXIOS.get != axios, en este se hace con el segundo
      //expect(axios).toBeCalledTimes(1);
    });
    renderEndTime = Date.now();

    const renderingTimeSeconds = (renderEndTime - renderStartTime) / 1000;

    // Assert that rendering time falls within the valid range
    expect(renderingTimeSeconds).toBeGreaterThanOrEqual(renderTimeRangeMin);
    expect(renderingTimeSeconds).toBeLessThanOrEqual(renderTimeRangeMax);
  });

  //Test Case id 19
  it("The component is rendered in an acceptable time for the user when decreasing a product (0 to 5 seconds)", async () => {
    const renderTimeRangeMin = 0; // 0 segundos
    const renderTimeRangeMax = 5000; // 5 segundos
    axiosStubGetWithErrorEqualToFalse();
    let renderStartTime;
    let renderEndTime;
    await act(async () => {
      render(<CartView />);
    });

    //Mock de la funcion reload de la pantalla
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    });
    renderStartTime = Date.now();
    await act(async () => {
      axiosStubGetDecreaseProductErrorEqualToFalse();
      const decreaseButton = await screen.getAllByText("-")[1];
      fireEvent.click(decreaseButton);
      //AXIOS.get != axios, en este se hace con el segundo
      //expect(axios).toBeCalledTimes(1);
    });
    renderEndTime = Date.now();
    const renderingTimeSeconds = (renderEndTime - renderStartTime) / 1000;
    // Assert that rendering time falls within the valid range
    expect(renderingTimeSeconds).toBeGreaterThanOrEqual(renderTimeRangeMin);
    expect(renderingTimeSeconds).toBeLessThanOrEqual(renderTimeRangeMax);
  });
});
