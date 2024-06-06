import DBProductStub from './DBProductStub';
import {ProductDAO} from '../ProductDAO';
import { Product as ProductModel } from "../../models/Product";

const measureTime = async (func: () => Promise<void>): Promise<number> => {
    const start = Date.now();
    await func();
    const end = Date.now();
    return end - start;
};

describe('DBPublicationStub Tests', () => {
  let dbStub: DBProductStub;
  let dbDAO: ProductDAO

  beforeEach(() => {
    dbStub = new DBProductStub();
  });

  // Test ID: 160
  it('should register a product if receiving a product object', async () => {
    const validProduct = new ProductModel('description1', 'photo1', 'Product1', 10, 100, 'product1');
    const productId = await dbStub.registerProduct(validProduct);
    expect(productId).toBe("fakeProductId");
    expect(dbStub.products).toContain(validProduct); 
  });

  // Test ID: 161
  it('should reject to register a product if receiving an object different from product', async () => {
    const invalidObject: any = {
      getDescription: () => "Description",
      getPrice: () => 100
    };
    const productId = await dbStub.registerProduct(invalidObject);
    expect(productId).toBeNull();
  });

   // Test ID: 162
   it('should update a product if receiving a product object', async () => {
    const updatedProduct = new ProductModel('updated description', 'updated photo', 'Product1', 15, 150, 'product1');
    const productId = await dbStub.updateProduct(updatedProduct);
    expect(productId).toBe('fakeProductId');
  });

  // Test ID: 163
  it('should return null if receiving an object different from product', async () => {
    const invalidObject: any = {
      getDescription: () => "Description",
      getPrice: () => 200
    };
    const result = await dbStub.updateProduct(invalidObject);
    expect(result).toBeNull();
  });

   // Test ID: 164
   it('should delete a product with an existing ID', async () => {
    const productId = 'product1';
    const product = await dbStub.deleteProduct(productId);
    expect(product).toBe('fakeProductId');
  });

  // Test ID: 165
  it('should reject to delete a product with a non-existing ID', async () => {
    const nonExistingProductId = 'nonExistingProduct';
    const result = await dbStub.deleteProduct(nonExistingProductId)
    expect(result).toBeNull();
  });

  // Test ID: 166
  it('should delete a product with an existing ID and remove it from all carts', async () => {
    const existingProductId = 'product1';
    const result = await dbStub.deleteProduct(existingProductId);
    expect(result).toBe('fakeProductId');
  });

  // Test ID: 167
    it('should get all products in an acceptable time (0 to 2 seconds)', async () => {
        const maxAcceptableTime = 2000; 
        const startTime = Date.now();
        const products = await dbStub.getProducts();
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;

        expect(products.length).toBeGreaterThan(0); 
        expect(elapsedTime).toBeLessThanOrEqual(maxAcceptableTime); 
    });

    // Test ID: 168
    it('should get all products in an acceptable time (0 to 5 seconds) for 1000 users at the same time', async () => {
        const concurrentUsers = 1000;
        const maxAcceptableTime = 5000; 

        const getProducts = async () => {
            const products = await dbStub.getProducts();
            expect(products.length).toBeGreaterThan(0); 
        };

        const promises = Array.from({ length: concurrentUsers }, () => measureTime(getProducts));
        const times = await Promise.all(promises);

        times.forEach(time => {
            expect(time).toBeLessThanOrEqual(maxAcceptableTime);
        });
    });

    // Test ID: 169
    it('should get a product with an existing ID', async () => {
        const existingProductId = 'product1';
        const product = await dbStub.getProduct(existingProductId);
        expect(product).toBeDefined(); 
        expect(product?.getID()).toBe(existingProductId); 
    });

    // Test ID: 170
    it('should reject to get a product with a non-existing ID', async () => {
        const nonExistingProductId = 'nonExistingProduct';
        const product = await dbStub.getProduct(nonExistingProductId);
        expect(product).toBeNull(); 
    });
});