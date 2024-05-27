/* eslint-disable */
import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import this line to extend Jest matchers
import CartPayment from "../CartPayment";
import MessageModal from "../../components/MessageModal";
import {
  axiosStubGetWithErrorEqualToFalse,
  axiosStubGetWithErrorEqualToTrue,
  axiosStubSendFormErrorEqualToFalse,
  axiosStubSendFormErrorEqualToTrue,
} from "./BackEndStub";
import axios from "axios";
jest.mock("axios");
jest.mock("../../components/MessageModal");
jest.mock("../../components/ClientWindow", () => ({ children }) => (
  <div>{children}</div>
));
jest.mock("react-router-dom", () => ({
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
}));

jest.useFakeTimers();
describe("Cart payment component", () => {
  beforeEach(() => {
    jest.restoreAllMocks(); // Ensure axios mocks are cleared before each test
    MessageModal.mockImplementation(
      jest.requireActual("../../components/MessageModal").default
    );
  });

  //Test case 20
  it("Renders name of each product correctly in the component", async () => {
    axiosStubGetWithErrorEqualToFalse();

    await act(async () => {
      render(<CartPayment />);
    });

    // Debugging

    //screen.debug();
    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
  });

  //Test case 21
  it("Renders units of each product correctly in the component", async () => {
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartPayment />);
    });

    // Debugging

    //screen.debug();
    expect(screen.getByText(/Unidades: 5/)).toBeInTheDocument();
    expect(screen.getByText(/Unidades: 2/)).toBeInTheDocument();
  });

  //Test case 22
  it("Renders the accumulated price of each product based on units and individual price", async () => {
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartPayment />);
    });

    // Debugging

    //screen.debug();
    expect(screen.getByText(/Subtotal: ₡50/)).toBeInTheDocument();
    expect(screen.getByText(/Subtotal: ₡40/)).toBeInTheDocument();
  });

  //Test case 23
  it("when the component renders, the provinces are present in it for the user to select. ", async () => {
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartPayment />);
    });

    // Debugging

    //screen.debug();
    expect(screen.getByText("Alajuela")).toBeInTheDocument();
    expect(screen.getByText("San José")).toBeInTheDocument();
    expect(screen.getByText("Cartago")).toBeInTheDocument();
    expect(screen.getByText("Heredia")).toBeInTheDocument();
    expect(screen.getByText("Guanacaste")).toBeInTheDocument();
    expect(screen.getByText("Limón")).toBeInTheDocument();
    expect(screen.getByText("Puntarenas")).toBeInTheDocument();
  });

  //Test case 24
  it("Doesn't render the names of the products when there was an error on the back", async () => {
    axiosStubGetWithErrorEqualToTrue();
    await act(async () => {
      render(<CartPayment />);
    });

    // Debugging

    //screen.debug();
    expect(screen.queryByText(/Product 1/i)).toBeNull();
    expect(screen.queryByText(/Product 2/i)).toBeNull();
  });

  //Test case 25
  it("Doesn't render units of each product when there was an error on the back", async () => {
    axiosStubGetWithErrorEqualToTrue();
    await act(async () => {
      render(<CartPayment />);
    });

    // Debugging

    //screen.debug();
    expect(screen.queryByText(/Unidades: 5/)).toBeNull();
    expect(screen.queryByText(/Unidades: 2/)).toBeNull();
  });

  //Test case 26
  it("Doesn't render the accumulated price of each product based on units and individual price when there is a backend error", async () => {
    axiosStubGetWithErrorEqualToTrue();
    await act(async () => {
      render(<CartPayment />);
    });
    // Debugging

    //screen.debug();
    expect(screen.queryByText(/Subtotal: ₡50/)).toBeNull();
    expect(screen.queryByText(/Subtotal: ₡40/)).toBeNull();
  });

  //Test Case 27
  it("Renders the total price of the cart without the delivery fee", async () => {
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartPayment />);
    });

    // Debugging

    //screen.debug();
    expect(screen.getByText(/Precio del carrito: ₡90/)).toBeInTheDocument();
  });

  //Test Case 28
  it("Renders the total price of the cart with the delivery fee", async () => {
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartPayment />);
    });

    // Debugging

    //screen.debug();
    expect(screen.queryByText(/Precio con envío: ₡3,090/)).toBeInTheDocument();
  });

  //Test Case 29
  it("Renders the cantons correctly when selecting a province", async () => {
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartPayment />);
    });

    // Debugging

    await act(async () => {
      fireEvent.change(screen.getByTestId("province-select"), {
        target: { value: 0 },
      });
    });
    expect(screen.queryByText(/Curridabat/)).toBeInTheDocument();
  });

  //Test Case 30
  it("Renders the districts correctly when selecting a province", async () => {
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartPayment />);
    });

    // Debugging

    await act(async () => {
      fireEvent.change(screen.getByTestId("province-select"), {
        target: { value: 0 },
      });
    });
    await act(async () => {
      fireEvent.change(screen.getByTestId("canton-select"), {
        target: { value: 5 },
      });
    });
    expect(screen.queryByText(/Gravilias/)).toBeInTheDocument();
  });

  //Test Case 31
  it("Renders a success message after sending the form", async () => {
    MessageModal.mockImplementation(({ message, is_open, error }) => (
      <div data-testid="mock-modal" is_open={is_open.toString()}>
        {/* Render del mensaje si no hay error */}
        {!error && <p>{message}</p>}
        {/* Render del error si hay error */}
        {error && <p>{error.toString()}</p>}
      </div>
    ));
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartPayment />);
    });

    // Mock user input
    await act(async () => {
      axiosStubSendFormErrorEqualToFalse();
      fireEvent.change(screen.getByTestId("province-select"), {
        target: { value: "1" },
      });
      fireEvent.change(screen.getByTestId("canton-select"), {
        target: { value: "41" },
      });
      fireEvent.change(screen.getByTestId("district-select"), {
        target: { value: "235" },
      });
      fireEvent.change(screen.getByTestId("input-details"), {
        target: { value: "123 Main St" },
      });
      fireEvent.change(screen.getByTestId("input-files"), {
        target: {
          files: [new File(["photo"], "photo.jpg", { type: "image/jpeg" })],
        },
      });
      // Submit form, no se porque la línea siguiente no funciona, cambiando directamente el form sí
      //fireEvent.submit(screen.getByRole("button", { name: "Confirmar" }));
      fireEvent.submit(screen.getByTestId("paymentForm"));
    });
    expect(
      screen.getByText("Pedido generado exitosamente")
    ).toBeInTheDocument();
  });

  //Test Case 32
  it("Renders the error message after sending the form returns an error", async () => {
    MessageModal.mockImplementation(({ message, is_open, error }) => (
      <div data-testid="mock-modal" is_open={is_open.toString()}>
        {/* Render del mensaje si no hay error */}
        {!error && <p>{message}</p>}
        {/* Render del error si hay error */}
        {error && <p>{message}</p>}
      </div>
    ));
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartPayment />);
    });

    // Mock user input
    await act(async () => {
      axiosStubSendFormErrorEqualToTrue();
      fireEvent.change(screen.getByTestId("province-select"), {
        target: { value: "1" },
      });
      fireEvent.change(screen.getByTestId("canton-select"), {
        target: { value: "41" },
      });
      fireEvent.change(screen.getByTestId("district-select"), {
        target: { value: "235" },
      });
      fireEvent.change(screen.getByTestId("input-details"), {
        target: { value: "123 Main St" },
      });
      fireEvent.change(screen.getByTestId("input-files"), {
        target: {
          files: [new File(["photo"], "photo.jpg", { type: "image/jpeg" })],
        },
      });
      // Submit form, no se porque la línea siguiente no funciona, cambiando directamente el form sí
      //fireEvent.submit(screen.getByRole("button", { name: "Confirmar" }));
      fireEvent.submit(screen.getByTestId("paymentForm"));
    });
    expect(
      screen.getByText("Ocurrió un error inesperado, intente de nuevo")
    ).toBeInTheDocument();
  });

  //Test Case 33
  it("The function that handles the response sets the error state variable correctly when there is not an error", async () => {
    MessageModal.mockImplementation(({ message, is_open, error }) => (
      <>
        {error ? (
          <div data-testid="mock-modal" is_open={is_open.toString()}>
            {message}
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
      render(<CartPayment />);
    });

    // Mock user input
    await act(async () => {
      axiosStubSendFormErrorEqualToFalse();
      fireEvent.change(screen.getByTestId("province-select"), {
        target: { value: "1" },
      });
      fireEvent.change(screen.getByTestId("canton-select"), {
        target: { value: "41" },
      });
      fireEvent.change(screen.getByTestId("district-select"), {
        target: { value: "235" },
      });
      fireEvent.change(screen.getByTestId("input-details"), {
        target: { value: "123 Main St" },
      });
      fireEvent.change(screen.getByTestId("input-files"), {
        target: {
          files: [new File(["photo"], "photo.jpg", { type: "image/jpeg" })],
        },
      });
      // Submit form, no se porque la línea siguiente no funciona, cambiando directamente el form sí
      //fireEvent.submit(screen.getByRole("button", { name: "Confirmar" }));
      fireEvent.submit(screen.getByTestId("paymentForm"));
    });
    expect(screen.getByText("false")).toBeInTheDocument();
  });

  //Test Case 34
  it("The function that handles the response sets the error state variable correctly when there is an error", async () => {
    MessageModal.mockImplementation(({ message, is_open, error }) => (
      <>
        {error ? (
          <div data-testid="mock-modal" is_open={is_open.toString()}>
            {error.toString()}
          </div>
        ) : (
          <div>
            <p>{message}</p>
          </div>
        )}
      </>
    ));
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartPayment />);
    });

    // Mock user input
    await act(async () => {
      axiosStubSendFormErrorEqualToTrue();
      fireEvent.change(screen.getByTestId("province-select"), {
        target: { value: "1" },
      });
      fireEvent.change(screen.getByTestId("canton-select"), {
        target: { value: "41" },
      });
      fireEvent.change(screen.getByTestId("district-select"), {
        target: { value: "235" },
      });
      fireEvent.change(screen.getByTestId("input-details"), {
        target: { value: "123 Main St" },
      });
      fireEvent.change(screen.getByTestId("input-files"), {
        target: {
          files: [new File(["photo"], "photo.jpg", { type: "image/jpeg" })],
        },
      });
      // Submit form, no se porque la línea siguiente no funciona, cambiando directamente el form sí
      //fireEvent.submit(screen.getByRole("button", { name: "Confirmar" }));
      fireEvent.submit(screen.getByTestId("paymentForm"));
    });
    expect(screen.getByText("true")).toBeInTheDocument();
  });

  //Test Case 35
  it("The component is rendered in an acceptable time for the user (0 to 5 seconds)", async () => {
    const renderTimeRangeMin = 0; // 0 segundos
    const renderTimeRangeMax = 5000; // 5 segundos

    axiosStubGetWithErrorEqualToFalse();
    let renderStartTime;
    let renderEndTime;
    renderStartTime = Date.now();
    await act(async () => {
      render(<CartPayment />);
    });
    renderEndTime = Date.now();

    const renderingTimeSeconds = (renderEndTime - renderStartTime) / 1000;

    // Ver que el tiempo de renderizado caiga entre los dos límites
    expect(renderingTimeSeconds).toBeGreaterThanOrEqual(renderTimeRangeMin);
    expect(renderingTimeSeconds).toBeLessThanOrEqual(renderTimeRangeMax);
  });

  //Test Case 36
  it("The component renders the cantons in an acceptable time for the user (0 to 5 seconds)", async () => {
    const renderTimeRangeMin = 0; // 0 segundos
    const renderTimeRangeMax = 5000; // 5 segundos
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartPayment />);
    });

    // Debugging
    let renderStartTime;
    let renderEndTime;
    renderStartTime = Date.now();
    await act(async () => {
      fireEvent.change(screen.getByTestId("province-select"), {
        target: { value: 0 },
      });
    });
    expect(screen.queryByText(/Curridabat/)).toBeInTheDocument();
    renderEndTime = Date.now();
    const renderingTimeSeconds = (renderEndTime - renderStartTime) / 1000;

    // Ver que el tiempo de renderizado caiga entre los dos límites
    expect(renderingTimeSeconds).toBeGreaterThanOrEqual(renderTimeRangeMin);
    expect(renderingTimeSeconds).toBeLessThanOrEqual(renderTimeRangeMax);
  });

  //Test Case 37
  it("The component renders the districts in an acceptable time for the user (0 to 5 seconds)", async () => {
    const renderTimeRangeMin = 0; // 0 segundos
    const renderTimeRangeMax = 5000; // 5 segundos
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartPayment />);
    });

    // Debugging
    let renderStartTime;
    let renderEndTime;
    renderStartTime = Date.now();
    await act(async () => {
      fireEvent.change(screen.getByTestId("province-select"), {
        target: { value: 0 },
      });
    });
    await act(async () => {
      fireEvent.change(screen.getByTestId("canton-select"), {
        target: { value: 5 },
      });
    });
    expect(screen.queryByText(/Gravilias/)).toBeInTheDocument();
    renderEndTime = Date.now();
    const renderingTimeSeconds = (renderEndTime - renderStartTime) / 1000;

    // Ver que el tiempo de renderizado caiga entre los dos límites
    expect(renderingTimeSeconds).toBeGreaterThanOrEqual(renderTimeRangeMin);
    expect(renderingTimeSeconds).toBeLessThanOrEqual(renderTimeRangeMax);
  });

  it("The component renders the succes message after sending a form in an acceptable time for the user (0 to 5 seconds)", async () => {
    const renderTimeRangeMin = 0; // 0 segundos
    const renderTimeRangeMax = 5000; // 5 segundos
    MessageModal.mockImplementation(({ message, is_open, error }) => (
      <div data-testid="mock-modal" is_open={is_open.toString()}>
        {/* Render del mensaje si no hay error */}
        {!error && <p>{message}</p>}
        {/* Render del error si hay error */}
        {error && <p>{error.toString()}</p>}
      </div>
    ));
    axiosStubGetWithErrorEqualToFalse();
    await act(async () => {
      render(<CartPayment />);
    });

    // Mock user input
    let renderStartTime;
    let renderEndTime;
    renderStartTime = Date.now();
    await act(async () => {
      axiosStubSendFormErrorEqualToFalse();
      fireEvent.change(screen.getByTestId("province-select"), {
        target: { value: "1" },
      });
      fireEvent.change(screen.getByTestId("canton-select"), {
        target: { value: "41" },
      });
      fireEvent.change(screen.getByTestId("district-select"), {
        target: { value: "235" },
      });
      fireEvent.change(screen.getByTestId("input-details"), {
        target: { value: "123 Main St" },
      });
      fireEvent.change(screen.getByTestId("input-files"), {
        target: {
          files: [new File(["photo"], "photo.jpg", { type: "image/jpeg" })],
        },
      });
      // Submit form, no se porque la línea siguiente no funciona, cambiando directamente el form sí
      //fireEvent.submit(screen.getByRole("button", { name: "Confirmar" }));
      fireEvent.submit(screen.getByTestId("paymentForm"));
    });
    expect(
      screen.getByText("Pedido generado exitosamente")
    ).toBeInTheDocument();
    renderEndTime = Date.now();
    const renderingTimeSeconds = (renderEndTime - renderStartTime) / 1000;

    // Ver que el tiempo de renderizado caiga entre los dos límites
    expect(renderingTimeSeconds).toBeGreaterThanOrEqual(renderTimeRangeMin);
    expect(renderingTimeSeconds).toBeLessThanOrEqual(renderTimeRangeMax);
  });
});
