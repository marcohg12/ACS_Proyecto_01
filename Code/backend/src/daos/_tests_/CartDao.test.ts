// CartDAO.test.ts
import { connectDB, disconnectDB } from './testDatabase';
import { CartDAO } from '../CartDAO';
import { Cart as CartModel } from '../../models/Cart'; 
import Order from '../../schemas/orderS'; 
import mongoose from 'mongoose';

const measureTime = async (func: () => Promise<void>): Promise<number> => {
    const start = Date.now();
    await func();
    const end = Date.now();
    return end - start;
};

describe('CartDAO Tests', () => {
  let cartDAO: CartDAO;

  beforeAll(async () => {
    await connectDB();
    cartDAO = new CartDAO();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('should not get a cart with an invalid user', async () => {
    const userId = 'invalid';
    await expect(cartDAO.getCart(userId)).resolves.toEqual({ products: [] });
  });

  it('should get a cart with a valid user', async () => {
    const userId = '6530f3e3cdf1e06a4798f7de';
    let cart: CartModel; 
    const cartData = await cartDAO.getCart(userId);
    cart = new CartModel(cartData.client, cartData.products, cartData._id);
    expect(cart).toBeDefined();
    expect(cart.getClient()).toBe(userId);
  });

  it('should handle getCart with 1000 users', async () => {
    const numUsers = 1000;
    const userIds = Array.from({ length: numUsers }, (_, index) => `user_${index}`);

    const start = performance.now();

    const promises = userIds.map(userId => measureTime(() => cartDAO.getCart(userId)));

    await Promise.all(promises);

    const end = performance.now();
    const totalTime = end - start;
    const averageTime = totalTime / numUsers;

    console.log(`Total time for ${numUsers} users: ${totalTime} milliseconds`);
  });

  it('should reject adding a cart with an invalid user', async () => {
    const idProduct = 'product_1';
    const units = 2;
    const idInvalidUser = 'invalid';

    await expect(cartDAO.addProduct(idProduct, units, idInvalidUser)).rejects.toThrow("Invalid User");
  });

  it('should add a cart with a valid user', async () => {
    const idProduct = 'product_1';
    const units = 2;
    const idValidUser = 'valid_user';

    await expect(cartDAO.addProduct(idProduct, units, idValidUser)).resolves.not.toThrow();
  });

  it('should handle adding a cart with a valid user for 1000 users', async () => {
    const idProduct = 'product_1';
    const units = 2;
    const numUsers = 1000;
    const idValidUser = 'valid_user';

    await Promise.all(Array.from({ length: numUsers }, () => cartDAO.addProduct(idProduct, units, idValidUser)));

    const startTime = Date.now();

    await Promise.all(Array.from({ length: numUsers }, () => cartDAO.addProduct(idProduct, units, idValidUser)));

    const endTime = Date.now();
    const totalTime = endTime - startTime;

    console.log(`Total time for ${numUsers} users: ${totalTime} milliseconds`);

    expect(totalTime).toBeLessThanOrEqual(2000);
  });

  it('should reject deleting a cart with an invalid user', async () => {
    const idProduct = 'product_1';
    const idInvalidUser = 'invalid';

    await expect(cartDAO.deleteProduct(idProduct, idInvalidUser)).rejects.toThrow("Invalid User");
  });

  it('should delete a cart with a valid user', async () => {
    const idProduct = 'product_1';
    const idValidUser = 'valid_user';

    await cartDAO.addProduct(idProduct, 2, idValidUser);

    await expect(cartDAO.deleteProduct(idProduct, idValidUser)).resolves.not.toThrow();
  });

  it('should handle deleting a cart with a valid user for 1000 users', async () => {
    const idProduct = 'product_1';
    const numUsers = 1000;
    const idValidUser = 'valid_user';

    await Promise.all(Array.from({ length: numUsers }, () => cartDAO.addProduct(idProduct, 2, idValidUser)));

    const startTime = Date.now();

    await Promise.all(Array.from({ length: numUsers }, () => cartDAO.deleteProduct(idProduct, idValidUser)));

    const endTime = Date.now();
    const totalTime = endTime - startTime;
    const averageTimePerUser = totalTime / numUsers;

    console.log(`Total time for ${numUsers} users: ${totalTime} milliseconds`);

    expect(averageTimePerUser).toBeLessThanOrEqual(2000);
  });

  it('should reject updating a cart with an invalid user', async () => {
    const idProduct = 'product_1';
    const idInvalidUser = 'invalid';

    await expect(cartDAO.updateUnits(idProduct, 5, idInvalidUser)).rejects.toThrow("Invalid User");
  });

  it('should update a cart with a valid user', async () => {
    const idProduct = 'product_1';
    const idValidUser = 'valid_user';

    await cartDAO.addProduct(idProduct, 2, idValidUser);

    await expect(cartDAO.updateUnits(idProduct, 5, idValidUser)).resolves.not.toThrow();
  });

  it('should handle updating a cart with a valid user for 1000 users', async () => {
    const idProduct = 'product_1';
    const units = 3;
    const numUsers = 1000;
    const idValidUser = 'valid_user';

    await Promise.all(Array.from({ length: numUsers }, () => cartDAO.addProduct(idProduct, 2, idValidUser)));

    const startTime = Date.now();

    await Promise.all(Array.from({ length: numUsers }, () => cartDAO.updateUnits(idProduct, units, idValidUser)));

    const endTime = Date.now();
    const totalTime = endTime - startTime;
    const averageTimePerUser = totalTime / numUsers;

    console.log(`Total time for ${numUsers} users: ${totalTime} milliseconds`);

    expect(averageTimePerUser).toBeLessThanOrEqual(2000);
  });

  it('should reject finding a cart with an invalid user', async () => {
    const idProduct = 'product_1';
    const idInvalidUser = 'invalid';

    await expect(cartDAO.findProduct(idProduct, idInvalidUser)).rejects.toThrow("Invalid User");
  });

  it('should find a cart with a valid user', async () => {
    const idProduct = 'product_1';
    const idValidUser = 'valid_user';

    await cartDAO.addProduct(idProduct, 2, idValidUser);

    const units = await cartDAO.findProduct(idProduct, idValidUser);
    expect(units).toBe(2);
  });

  it('should handle finding a cart with a valid user for 1000 users', async () => {
    const idProduct = 'product_1';
    const units = 2;
    const numUsers = 1000;
    const idValidUser = 'valid_user';

    await Promise.all(Array.from({ length: numUsers }, () => cartDAO.addProduct(idProduct, units, idValidUser)));

    const startTime = Date.now();

    await Promise.all(Array.from({ length: numUsers }, () => cartDAO.findProduct(idProduct, idValidUser)));

    const endTime = Date.now();
    const totalTime = endTime - startTime;
    const averageTimePerUser = totalTime / numUsers;

    console.log(`Total time for ${numUsers} users: ${totalTime} milliseconds`);

    expect(averageTimePerUser).toBeLessThanOrEqual(2000);
  });

  it('should reject registering an order with an invalid user', async () => {
    const invalidUser = 'invalid';
    const orderData = {
      client: invalidUser,
      orderDate: new Date(),
      address: 'Test Address',
      priceWithDelivery: 100,
      lineProducts: [{ id: '1', name: 'Product 1', units: 2, price: 50 }],
      state: 1,
    };

    await expect(
      cartDAO.registerOrder(
        orderData.client,
        orderData.orderDate,
        orderData.address,
        orderData.priceWithDelivery,
        orderData.lineProducts,
        orderData.state
      )
    ).rejects.toThrow("Invalid User");
  });

  it('should register an order with a valid user', async () => {
    const validUser = 'valid_user';
    const orderData = {
      client: validUser,
      orderDate: new Date(),
      address: 'Test Address',
      priceWithDelivery: 100,
      lineProducts: [{ id: '1', name: 'Product 1', units: 2, price: 50 }],
      state: 1,
    };

    await expect(
      cartDAO.registerOrder(
        orderData.client,
        orderData.orderDate,
        orderData.address,
        orderData.priceWithDelivery,
        orderData.lineProducts,
        orderData.state
      )
    ).resolves.not.toThrow();
  });
});
