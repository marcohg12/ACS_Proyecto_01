// CartDAO.test.ts
import { connectDB, disconnectDB } from './testDatabase';
import { CartDAO } from '../CartDAO';
import { Cart as CartModel } from '../../models/Cart';

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

  //Test ID: 8
  it('should not get a cart with an invalid user', async () => {
    const userId = 'invalid';
    await expect(cartDAO.getCart(userId)).resolves.toEqual({ products: [] });
  });

  //Test ID: 9
  it('should get a cart with a valid user', async () => {
    const userId = '6535bd7c8a49de9cdfa015de';
    let cart: CartModel; 
    const cartData = await cartDAO.getCart(userId);
    cart = new CartModel(userId, cartData.products, cartData._id);
    expect(cart).toBeDefined();
    expect(cart.getClient()).toBe(userId);
  });

  //Test ID: 10 y 11
  it('should handle getCart with 100 users', async () => {
    const concurrentUsers = 100;
    const maxAcceptableTime = 5000;

    const getCart = async (userId: string) => {
        const start = Date.now();
        await cartDAO.getCart(userId);
        const end = Date.now();
        return end - start;
    };

    const promises = Array.from({ length: concurrentUsers }, (_, index) => {
        const userId = `user_${index}`;
        return measureTime(async () => {
            await getCart(userId);
        });
    });

    const times = await Promise.all(promises);

    times.forEach(time => {
        expect(time).toBeLessThanOrEqual(maxAcceptableTime);
    });
  });

  //Test ID: 12
  it('should reject adding a cart with an invalid user', async () => {
    const idProduct = 'invalid';
    const units = 2;
    const idInvalidUser = 'invalid';
    const result = await cartDAO.addProduct(idProduct, units, idInvalidUser);
    expect(result).toBe(null);
  });

  //Test ID: 13
  it('should add a cart with a valid user', async () => {
    const idProduct = '653b196dabde790bc08e3c4f';
    const units = 2;
    const idValidUser = '6530f3e3cdf1e06a4798f7e0';
    await expect(cartDAO.addProduct(idProduct, units, idValidUser)).resolves.not.toThrow();
  });

  //Test ID: 14 y 15
  it('should handle adding a cart with a valid user for 100 users', async () => {
    const idProduct = '653b2f0b9cddb8de686495a5';
    const units = 1;
    const numUsers = 100;
    const idValidUser = '6563bb4e2f2e18184bea1416';

    const addProductTime = async () => {
        const start = Date.now();
        await cartDAO.addProduct(idProduct, units, idValidUser);
        const end = Date.now();
        return end - start;
    };

    const addProductPromises = Array.from({ length: numUsers }, () => addProductTime());

    const addProductTimes = await Promise.all(addProductPromises);
    const addProductTotalTime = addProductTimes.reduce((total, time) => total + time, 0);

    addProductTimes.forEach(time => {
      expect(time).toBeLessThanOrEqual(3000);
    });
  });

  //Test ID: 16
  it('should reject deleting a cart with an invalid user', async () => {
    const idProduct = 'product_1';
    const idInvalidUser = 'invalid';
    const result = await cartDAO.deleteProduct(idProduct, idInvalidUser);
    expect(result).toBe(null)
  });

  //Test ID: 17
  it('should delete a cart with a valid user', async () => {
    const idProduct = '653b297a9cddb8de686494c3';
    const idValidUser = '6563bb4e2f2e18184bea1416';

    await cartDAO.addProduct(idProduct, 2, idValidUser);

    await expect(cartDAO.deleteProduct(idProduct, idValidUser)).resolves.not.toThrow();
  });

  //Test ID: 18 y 19
  it('should handle deleting a cart with a valid user for 100 users', async () => {
    const idProduct = '653b2f0b9cddb8de686495a5';
    const numUsers = 100;
    const idValidUser = '6563bb4e2f2e18184bea1416';

    await Promise.all(Array.from({ length: numUsers }, () => cartDAO.addProduct(idProduct, 2, idValidUser)));
    const startTimes = Array.from({ length: numUsers }, () => Date.now());
    await Promise.all(Array.from({ length: numUsers }, () => cartDAO.deleteProduct(idProduct, idValidUser)));
    const endTimes = Array.from({ length: numUsers }, () => Date.now());

    const totalTime = endTimes.reduce((total, end, index) => total + (end - startTimes[index]), 0);
    const averageTimePerUser = totalTime / numUsers;

    expect(averageTimePerUser).toBeLessThanOrEqual(1000000);
  });

  //Test ID: 20
  it('should reject updating a cart with an invalid user', async () => {
    const idProduct = 'product_1';
    const idInvalidUser = 'invalid';
    const result = await cartDAO.updateUnits(idProduct, 5, idInvalidUser);
    expect(result).toBe(null)
  });

  //Test ID: 21 
  it('should update a cart with a valid user', async () => {
    const idProduct = '653b297a9cddb8de686494c3';
    const idValidUser = '6563bb4e2f2e18184bea1416';

    await cartDAO.addProduct(idProduct, 2, idValidUser);

    await expect(cartDAO.updateUnits(idProduct, 5, idValidUser)).resolves.not.toThrow();
  });

  //Test ID: 22 y 23
  it('should handle updating a cart with a valid user for 100 users', async () => {
    const idProduct = '653b2f0b9cddb8de686495a5';
    const units = 1;
    const numUsers = 100;
    const idValidUser = '653b2f0b9cddb8de686495a5';
    const maxAcceptableTime = 2000;

    await Promise.all(Array.from({ length: numUsers }, () => cartDAO.addProduct(idProduct, 2, idValidUser)));

    const measureTime = async () => {
        const start = Date.now();
        await cartDAO.updateUnits(idProduct, units, idValidUser);
        const end = Date.now();
        return end - start;
    };

    const updatePromises = Array.from({ length: numUsers }, () => measureTime());

    const updateTimes = await Promise.all(updatePromises);
    const totalTime = updateTimes.reduce((total, time) => total + time, 0);
    console.log(`Total time for ${numUsers} users: ${totalTime} milliseconds`);

    updateTimes.forEach(time => {
        expect(time).toBeLessThanOrEqual(maxAcceptableTime);
    });
  });

  //Test ID: 24
  it('should handle finding a cart with an invalid user', async () => {
    const idProduct = 'product_1';
    const idInvalidUser = 'invalid'; 
    const result = await cartDAO.findProduct(idProduct, idInvalidUser);
    expect(result).toBe(null); 
  });

  //Test ID: 25
  it('should find a cart with a valid user and updated units', async () => {
    const idProduct = '653b297a9cddb8de686494c3';
    const idValidUser = '6563bb4e2f2e18184bea1416';

    await cartDAO.addProduct(idProduct, 2, idValidUser);
    await cartDAO.updateUnits(idProduct, 5, idValidUser);

    const units = await cartDAO.findProduct(idProduct, idValidUser);
    expect(units).toBe(5);
  });

  //Test ID: 26 y 27
  it('should handle finding a cart with a valid user for 100 users', async () => {
    const idProduct = '653b196dabde790bc08e3c4f';
    const units = 2;
    const numUsers = 100;
    const idValidUser = '6563bb4e2f2e18184bea1416';

    await Promise.all(Array.from({ length: numUsers }, () => cartDAO.addProduct(idProduct, units, idValidUser)));

    const findProductTime = async () => {
        const start = Date.now();
        await cartDAO.findProduct(idProduct, idValidUser);
        const end = Date.now();
        return end - start;
    };

    const findProductPromises = Array.from({ length: numUsers }, () => findProductTime());
    const findProductTimes = await Promise.all(findProductPromises);
    findProductTimes.forEach(time => {
        expect(time).toBeLessThanOrEqual(2000);
    });

  });

  //Test ID: 28
  it('should reject to register an order with an invalid user', async () => {
    const validUser = '65a440f54ca3f04c1510ade2'; 
    const validProductId = '653b2f0b9cddb8de686495a5'; 
    const orderData = {
      client: validUser,
      orderDate: new Date(),
      address: 'Test Address',
      priceWithDelivery: 100,
      lineProducts: [
        { id: validProductId, name: 'Product 1', units: 2, price: 50 }
      ],
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

  //Test ID: 29
  it('should register an order with a valid user', async () => {
    const validUser = '65a440f54ca3f04c1510ade2';
    const orderData = {
      client: validUser,
      orderDate: new Date(),
      address: 'Test Address',
      priceWithDelivery: 100,
      lineProducts: [{ id: '653b196dabde790bc08e3c4f', name: 'Product 1', units: 2, price: 50 }],
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

  //Test ID: 30 y 31
  it('should register an order with a valid user for 100 users', async () => {
    const numUsers = 100;
    const registerOrderTime = async () => {
      const validUser = '65a440f54ca3f04c1510ade2'; 
      const orderData = {
        client: validUser,
        orderDate: new Date(),
        address: 'Test Address',
        priceWithDelivery: 100,
        lineProducts: [{ id: '653b196dabde790bc08e3c4f', name: 'Product 1', units: 2, price: 50 }],
        state: 1,
      };
      const start = Date.now();
      await cartDAO.registerOrder(
        orderData.client,
        orderData.orderDate,
        orderData.address,
        orderData.priceWithDelivery,
        orderData.lineProducts,
        orderData.state
      );
      const end = Date.now();
      return end - start;
    };
  
    const registerOrderPromises = Array.from({ length: numUsers }, () => registerOrderTime());
    const registerOrderTimes = await Promise.all(registerOrderPromises);
  
    registerOrderTimes.forEach(time => {
      expect(time).toBeLessThanOrEqual(2000);
    });
  });
});
