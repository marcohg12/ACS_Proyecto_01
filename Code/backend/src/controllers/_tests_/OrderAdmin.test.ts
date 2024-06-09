import {
  ProductDoesNotExists,
  ProductNotInStock,
} from "../../exceptions/exceptions";
import { OrderAdmin } from "../OrderAdmin";
import { ICalendarAdmin } from "../../interfaces/ICalendarAdmin";
import { IOrderDAO } from "../../interfaces/IOrderDAO";
import { IProductDAO } from "../../interfaces/IProductDAO";

describe("OrderService", () => {
  let orderAdmin: OrderAdmin;

  const productDAOMock: jest.Mocked<IProductDAO> = {
    getProduct: jest.fn(),
    getProducts: jest.fn(),
    registerProduct: jest.fn(),
    updateProduct: jest.fn(),
    updateProductUnits: jest.fn(),
    deleteProduct: jest.fn(),
  };

  const orderDAOMock: jest.Mocked<IOrderDAO> = {
    getOrders: jest.fn(),
    getOrdersUser: jest.fn(),
    getDetail: jest.fn(),
    changeOrderState: jest.fn(),
    setDeliveryDate: jest.fn(),
  };

  const calendarAdminMock: jest.Mocked<ICalendarAdmin> = {
    registerEvent: jest.fn(),
    updateEvent: jest.fn(),
    deleteEvent: jest.fn(),
    getEvent: jest.fn(),
    getEvents: jest.fn(),
    overlaps: jest.fn(),
  };

  beforeEach(() => {
    orderAdmin = new OrderAdmin(
      productDAOMock,
      orderDAOMock,
      calendarAdminMock
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Test should return all orders", async () => {
    orderDAOMock.getOrders.mockResolvedValueOnce([]);
    const orders = await orderAdmin.getOrders();
    expect(orders).toBeDefined();
  });

  it("Test should return all orders from a client", async () => {
    orderDAOMock.getOrdersUser.mockResolvedValueOnce([]);
    const orders = await orderAdmin.getUserOrders("1");
    expect(orders).toBeDefined();
  });

  it("Test should return the details of a client's order by its id", async () => {
    orderDAOMock.getDetail.mockResolvedValueOnce({});
    const order = await orderAdmin.getOrder("1");
    expect(order).toBeDefined();
  });

  it("Test should calculate the order date for tuesday when the current day is saturday", async () => {
    const date = new Date("2024-06-08T12:00:00Z");
    jest.spyOn(global, "Date").mockImplementation(() => {
      return date;
    });

    await orderAdmin.setDeliveryDate("1");

    expect(orderDAOMock.setDeliveryDate).toHaveBeenCalledWith(
      "1",
      new Date("2024-06-11T14:00:00Z")
    );
  });

  it("Test should calculate the order date for thursday when the current day is tuesday", async () => {
    const date = new Date("2024-06-11T12:00:00Z");
    jest.spyOn(global, "Date").mockImplementation(() => {
      return date;
    });

    await orderAdmin.setDeliveryDate("1");

    expect(orderDAOMock.setDeliveryDate).toHaveBeenCalledWith(
      "1",
      new Date("2024-06-13T14:00:00Z")
    );
  });

  it("Test should calculate the order date for saturday when the current day is thursday", async () => {
    const date = new Date("2024-06-13T12:00:00Z");
    jest.spyOn(global, "Date").mockImplementation(() => {
      return date;
    });

    await orderAdmin.setDeliveryDate("1");

    expect(orderDAOMock.setDeliveryDate).toHaveBeenCalledWith(
      "1",
      new Date("2024-06-15T14:00:00Z")
    );
  });

  it("Test should notify and register the event in the calendar when an order is approved", async () => {
    const orderId = "1";
    const state = 2;

    orderDAOMock.getDetail.mockResolvedValueOnce({
      _id: "1",
      orderDate: new Date(),
      deliveryDate: new Date(),
      address: "500 mts sur",
      price: 12500,
      photoOfPayment: "/photos/1",
      lineProducts: [{ id: "1", name: "Eucerin", units: 1, price: 12500 }],
      state: 2,
      userInfo: { name: "Marco" },
    });

    const setDeliveryDateSpy = jest.spyOn(orderAdmin, "setDeliveryDate");
    const notifySpy = jest.spyOn(orderAdmin, "notify");

    await orderAdmin.setOrderState(orderId, state);

    expect(orderDAOMock.changeOrderState).toHaveBeenCalledWith(orderId, state);
    expect(setDeliveryDateSpy).toHaveBeenCalledWith(orderId);
    expect(notifySpy).toHaveBeenCalled();
    expect(calendarAdminMock.registerEvent).toHaveBeenCalled();
  });

  it("Test should notify when an order is canceled and not register the event in the calendar", async () => {
    const orderId = "1";
    const state = 4;

    orderDAOMock.getDetail.mockResolvedValueOnce({
      _id: "1",
      orderDate: new Date(),
      deliveryDate: new Date(),
      address: "500 mts sur",
      price: 12500,
      photoOfPayment: "/photos/1",
      lineProducts: [{ id: "1", name: "Eucerin", units: 1, price: 12500 }],
      state: 4,
      userInfo: { name: "Marco" },
    });

    const setDeliveryDateSpy = jest.spyOn(orderAdmin, "setDeliveryDate");
    const notifySpy = jest.spyOn(orderAdmin, "notify");

    await orderAdmin.setOrderState(orderId, state);

    expect(orderDAOMock.changeOrderState).toHaveBeenCalledWith(orderId, state);
    expect(setDeliveryDateSpy).toHaveBeenCalledTimes(0);
    expect(notifySpy).toHaveBeenCalled();
    expect(calendarAdminMock.registerEvent).toHaveBeenCalledTimes(0);
  });

  it("Test should check each product of an order exists and has enough units when confirming it", async () => {
    const orderId = "1";
    const state = 2;

    orderDAOMock.getDetail.mockResolvedValue({
      _id: "1",
      orderDate: new Date(),
      deliveryDate: new Date(),
      address: "500 mts sur",
      price: 12500,
      photoOfPayment: "/photos/1",
      lineProducts: [{ id: "1", name: "Eucerin", units: 1, price: 12500 }],
      state: 2,
      userInfo: { name: "Marco" },
    });

    productDAOMock.getProduct.mockResolvedValueOnce({
      _id: "1",
      name: "Eucerin",
      units: 2,
      price: 12500,
    });

    const setOrderStateSpy = jest.spyOn(orderAdmin, "setOrderState");

    await orderAdmin.confirmOrder(orderId);

    expect(productDAOMock.updateProductUnits).toHaveBeenCalledWith("1", 1);
    expect(setOrderStateSpy).toHaveBeenCalledWith(orderId, state);
  });

  it("Test should raise an exception when a product from an order does not exists", async () => {
    const orderId = "1";

    orderDAOMock.getDetail.mockResolvedValue({
      _id: "1",
      orderDate: new Date(),
      deliveryDate: new Date(),
      address: "500 mts sur",
      price: 12500,
      photoOfPayment: "/photos/1",
      lineProducts: [{ id: "1", name: "Eucerin", units: 1, price: 12500 }],
      state: 1,
      userInfo: { name: "Marco" },
    });

    productDAOMock.getProduct.mockResolvedValueOnce(undefined);

    expect(async () => {
      await orderAdmin.confirmOrder(orderId);
    }).rejects.toThrow(ProductDoesNotExists);
  });

  it("Test should raise an exception when a product from an order does not have enough units", async () => {
    const orderId = "1";

    orderDAOMock.getDetail.mockResolvedValue({
      _id: "1",
      orderDate: new Date(),
      deliveryDate: new Date(),
      address: "500 mts sur",
      price: 12500,
      photoOfPayment: "/photos/1",
      lineProducts: [{ id: "1", name: "Eucerin", units: 1, price: 12500 }],
      state: 1,
      userInfo: { name: "Marco" },
    });

    productDAOMock.getProduct.mockResolvedValueOnce({
      _id: "1",
      name: "Eucerin",
      units: 0,
      price: 12500,
    });

    expect(async () => {
      await orderAdmin.confirmOrder(orderId);
    }).rejects.toThrow(ProductNotInStock);
  });
});
