import {CartDAO} from '../CartDAO';
import DataBaseStub from './DBCartStub';
const { performance } = require('perf_hooks');
  
describe('CartDAO Tests', () => {
    let cartDAO: CartDAO;

    beforeEach(() => {
        cartDAO = new DataBaseStub();
    });

    //Test Case ID: 8
    it('Test do not get a cart with an invalid user', async () => {
        const userId = 'invalid';

        try {
        await cartDAO.getCart(userId);
        fail("Expect an error");
        } catch (error) {
        expect(error.message).toBe("Invalid User");
        }
    });
  
    //Test Case ID: 9
    it('Test get a cart with a valid user', async () => {
        const userId = 'valid_user';
    
        const expectedCart = {
        products: [
            { productRef: 'product_1', units: 2 },
            { productRef: 'product_2', units: 3 },
        ],
        };
        (cartDAO as any).cartData[userId] = expectedCart;
    
        const cart = await cartDAO.getCart(userId);

        expect(cart).toEqual(expectedCart);
    });

    //Test Case ID: 10 y 11
    it('Test getCart with 1000 users', async () => {
        const numUsers = 1000;
        const userIds = Array.from({ length: numUsers }, (_, index) => `user_${index}`);

        const start = performance.now();

        const promises = userIds.map(userId => cartDAO.getCart(userId));

        await Promise.all(promises);

        const end = performance.now();
        const totalTime = end - start;
        const averageTime = totalTime / numUsers;

        console.log(`Total time for ${numUsers} users: ${totalTime} miliseconds`);
    });

    //Test Case ID: 12
     it('Test rejects to add a cart with an invalid user', async () => {
        const idProduct = 'product_1';
        const units = 2;
        const idInvalidUser = 'invalid';
    
        await expect(cartDAO.addProduct(idProduct, units, idInvalidUser)).rejects.toThrow("Invalid User");
    });

    //Test Case ID: 13
    it('Test add a cart with a valid user', async () => {
        const idProduct = 'product_1';
        const units = 2;
        const idValidUser = 'valid_user';

        await expect(cartDAO.addProduct(idProduct, units, idValidUser)).resolves.not.toThrow();
    });

    //Test Case ID: 14 y 15
    test('Test add a cart with a valid user for 1000 users', async () => {
        const idProduct = 'product_1';
        const units = 2;
        const numUsers = 1000;
        const idValidUser = 'valid_user';
    
        const startTime = Date.now();

        await Promise.all(Array.from({ length: numUsers }, () => cartDAO.addProduct(idProduct, units, idValidUser)));
    
        const endTime = Date.now();
        const totalTime = endTime - startTime;
    
        console.log(`Total time for ${numUsers} users: ${totalTime} miliseconds`);

        expect(totalTime).toBeLessThanOrEqual(2000); 
    });
  
    //Test Case ID: 16
    it('Test rejects to delete a cart with an invalid user', async () => {
        const idProduct = 'product_1';
        const idInvalidUser = 'invalid';

        await expect(cartDAO.deleteProduct(idProduct, idInvalidUser)).rejects.toThrow("Invalid User");
    });

    //Test Case ID:17
    it('Test delete a cart with a valid user', async () => {
        const idProduct = 'product_1';
        const idValidUser = 'valid_user';

        await cartDAO.addProduct(idProduct, 2, idValidUser);

        await expect(cartDAO.deleteProduct(idProduct, idValidUser)).resolves.not.toThrow();
    });

    //Test Case ID: 18 y 19
    it('Test delete a cart with a valid user for 1000 users', async () => {
        const idProduct = 'product_1';
        const numUsers = 1000;
        const idValidUser = 'valid_user';
      
        await Promise.all(Array.from({ length: numUsers }, () => cartDAO.addProduct(idProduct, 2, idValidUser)));
      
        const startTime = Date.now();

        await Promise.all(Array.from({ length: numUsers }, () => cartDAO.deleteProduct(idProduct, idValidUser)));
      
        const endTime = Date.now();
        const totalTime = endTime - startTime;
        const averageTimePerUser = totalTime / numUsers;
      
        console.log(`Total time for ${numUsers} users: ${totalTime} miliseconds`);
      
        expect(averageTimePerUser).toBeLessThanOrEqual(2000);
    });

    //Test Case ID: 20
    it('Test rejects to update a cart with an invalid user', async () => {
        const idProduct = 'product_1';
        const idInvalidUser = 'invalid';

        await expect(cartDAO.updateUnits(idProduct, 5, idInvalidUser)).rejects.toThrow("Invalid User");
    });

    //Test Case ID: 21
    test('Test update a cart with a valid user', async () => {
        const idProduct = 'product_1';
        const idValidUser = 'valid_user';

        await cartDAO.addProduct(idProduct, 2, idValidUser);

        await expect(cartDAO.updateUnits(idProduct, 5, idValidUser)).resolves.not.toThrow();
    });

    //Test Case ID: 22 y 23
    it('Test update a cart with a valid user for 1000 users', async () => {
        const idProduct = 'product_1';
        const units = 3
        const numUsers = 1000;
        const idValidUser = 'valid_user';
      
        await Promise.all(Array.from({ length: numUsers }, () => cartDAO.addProduct(idProduct, 2, idValidUser)));
      
        const startTime = Date.now();

        await Promise.all(Array.from({ length: numUsers }, () => cartDAO.updateUnits(idProduct, units, idValidUser)));
      
        const endTime = Date.now();
        const totalTime = endTime - startTime;
        const averageTimePerUser = totalTime / numUsers;
      
        console.log(`Total time for ${numUsers} users: ${totalTime} miliseconds`);
      
        expect(averageTimePerUser).toBeLessThanOrEqual(2000);
    });

    //Test Case ID: 24
    it('Test rejects to find a cart with an invalid user', async () => {
        const idProduct = 'producto_1';
        const idInvalidUser = 'invalid';

        await expect(cartDAO.findProduct(idProduct, idInvalidUser)).rejects.toThrow("Invalid User");
    });

    //Test Case ID: 25
    it('Test find a cart with a valid user', async () => {
        const idProduct = 'producto_1';
        const idValidUser = 'valid_user';

        await cartDAO.addProduct(idProduct, 2, idValidUser);

        const units = await cartDAO.findProduct(idProduct, idValidUser);
        expect(units).toBe(2);
    });

    //Test Case ID: 26 and 27
    it('Test find a cart with a valid user for 1000 users', async () => {
        const idProduct = 'producto_1';
        const units = 2
        const numUsers = 1000;
        const idValidUser = 'valid_user';
      
        await Promise.all(Array.from({ length: numUsers }, () => cartDAO.addProduct(idProduct, 2, idValidUser)));
      
        const startTime = Date.now();

        await Promise.all(Array.from({ length: numUsers }, () => cartDAO.findProduct(idProduct, idValidUser)));
      
        const endTime = Date.now();
        const totalTime = endTime - startTime;
        const averageTimePerUser = totalTime / numUsers;
      
        console.log(`Total time for ${numUsers} users: ${totalTime} miliseconds`);
      
        expect(averageTimePerUser).toBeLessThanOrEqual(2000);
    });

    //Test Case ID: 28
    it('Test rejects to register an order with an invalid user', async () => {
        const invalidUser = 'invalid';
        const orderData = {
            client: invalidUser,
            orderDate: new Date(),
            address: 'Dirección de prueba',
            priceWithDelivery: 100,
            lineProducts: [{ id: '1', name: 'Producto 1', units: 2, price: 50 }],
            state: 1
        };

        await expect(cartDAO.registerOrder(
            orderData.client,
            orderData.orderDate,
            orderData.address,
            orderData.priceWithDelivery,
            orderData.lineProducts,
            orderData.state
        )).rejects.toThrow("Invalid User");
    });

    //Test Case ID: 29
    test('Test register an order with a valid user', async () => {
        const validUser = 'valid_user';
        const orderData = {
            client: validUser,
            orderDate: new Date(),
            address: 'Dirección de prueba',
            priceWithDelivery: 100,
            lineProducts: [{ id: '1', name: 'Producto 1', units: 2, price: 50 }],
            state: 1
        };

        await expect(cartDAO.registerOrder(
            orderData.client,
            orderData.orderDate,
            orderData.address,
            orderData.priceWithDelivery,
            orderData.lineProducts,
            orderData.state
        )).resolves.not.toThrow();
    });

    //Test Case ID: 30 and 31
    it('Test register an order with a valid user for 1000 users', async () => {
        const numUsers = 1000;
        const validUser = 'valid_user';
        const orderData = {
            orderDate: new Date(),
            address: 'Dirección de prueba',
            priceWithDelivery: 100,
            lineProducts: [{ id: '1', name: 'Producto 1', units: 2, price: 50 }],
            state: 1
        };
    
        await Promise.all(Array.from({ length: numUsers }, () =>
            cartDAO.registerOrder(
                validUser,
                orderData.orderDate,
                orderData.address,
                orderData.priceWithDelivery,
                orderData.lineProducts,
                orderData.state
            )
        ));
    
        const startTime = Date.now();
    
        await Promise.all(Array.from({ length: numUsers }, () =>
            cartDAO.registerOrder(
                validUser,
                orderData.orderDate,
                orderData.address,
                orderData.priceWithDelivery,
                orderData.lineProducts,
                orderData.state
            )
        ));
    
        const endTime = Date.now();
        const totalTime = endTime - startTime;
        const averageTimePerUser = totalTime / numUsers;
    
        console.log(`Total time for ${numUsers} users: ${totalTime} miliseconds`);
    
        expect(averageTimePerUser).toBeLessThanOrEqual(2000);
    });
});

