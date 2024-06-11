import { connectDB, disconnectDB } from './testDatabase';
import { ProductDAO } from '../ProductDAO';
import { CartDAO } from '../CartDAO';
import { Product as ProductModel } from '../../models/Product';
import mongoose from 'mongoose';


const measureTime = async (func: () => Promise<void>): Promise<number> => {
    const start = Date.now();
    await func();
    const end = Date.now();
    return end - start;
};

describe('ProductDAO Tests', () => {
    let productDAO: ProductDAO;
    let cartDAO: CartDAO

    beforeAll(async () => {
        await connectDB();
        productDAO = new ProductDAO();
        cartDAO = new CartDAO();
    });

    afterAll(async () => {
        await disconnectDB();
    });

    // Test ID: 160
    let productId: string;
    it('should register a product if receiving a product object', async () => {
      const validProduct = new ProductModel(
        "Effalclar Duo+ La Roche Posay - 75 ml",
        "/photos/products/652751e03bfa6a1d5636d453.png",
        "Effaclar Duo+",
        195,
        24000
      );
        const result = await productDAO.registerProduct(validProduct);

        productId = result as string; 
        expect(productId).toBeDefined();

        const registeredProduct = await productDAO.getProduct(productId);
        expect(registeredProduct.description).toBe("Effalclar Duo+ La Roche Posay - 75 ml");
    });

    // Test ID: 161
    it('should reject to register a product if receiving an object different from product', async () => {
        const invalidObject: any = {
            getDescription: () => "Description",
            getPrice: () => 100
        };
        await expect(productDAO.registerProduct(invalidObject)).rejects.toThrow();
    });

    // Test ID: 162
    it('should update a product if receiving a product object', async () => {
      const validProduct = new ProductModel(
        "Effalclar Duo+ La Roche Posay - 75 ml",
        "/photos/products/652751e03bfa6a1d5636d453.png",
        "Effaclar Duo+",
        195,
        23500,
        productId
      );
      const result = await productDAO.updateProduct(validProduct);
      expect(result).toBeDefined(); 

      const registeredProduct = await productDAO.getProduct(validProduct.getID());
      expect(registeredProduct?.description).toBe("Effalclar Duo+ La Roche Posay - 75 ml");
      expect(registeredProduct?.price).toBe(23500);
    });

    // Test ID: 163
    it('should return null if receiving an object different from product', async () => {
        const invalidObject: any = {
            getDescription: () => "Description",
            getPrice: () => 200
        };
        await expect(productDAO.updateProduct(invalidObject)).rejects.toThrow();
    });

    // Test ID: 164
    it('should delete a product with an existing ID', async () => {
      const deleteResult = await productDAO.deleteProduct(productId);
      expect(deleteResult.deletedCount).toBe(1);

      const fetchedProduct = await productDAO.getProduct(productId);
      expect(fetchedProduct).toBe(null);
    });

    // Test ID: 165
    it('should reject to delete a product with a non-existing ID', async () => {
        const nonExistingProductId = new mongoose.Types.ObjectId().toString();
        const result = await productDAO.deleteProduct(nonExistingProductId)
        expect(result.deletedCount).toBe(0);
    });

    // Test ID: 166
    it('should delete a product with an existing ID and remove it from all carts', async () => {      // Action: Call deleteProduct
      const id = "652751e03bfa6a1d5636d453"
      await productDAO.deleteProduct(id);

      const deletedProduct = await productDAO.getProduct(id);
      expect(deletedProduct).toBeNull();

      const updatedCart = await cartDAO.findProduct(id, "6535bd7c8a49de9cdfa015de")
      expect(updatedCart).toBe(-1);

      await productDAO.registerProduct(new ProductModel(
        "Effalclar Duo+ La Roche Posay - 75 ml",
        "/photos/products/652751e03bfa6a1d5636d453.png",
        "Effaclar Duo+",
        195,
        23500
      ))
      await cartDAO.addProduct("652751e03bfa6a1d5636d453", 3, "6535bd7c8a49de9cdfa015de")
    });

    // Test ID: 167
    it('should get all products in an acceptable time (0 to 2 seconds)', async () => {
        const maxAcceptableTime = 3000;
        const startTime = Date.now();
        const products = await productDAO.getProducts();
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;

        expect(products.length).toBeGreaterThan(0);
        expect(elapsedTime).toBeLessThanOrEqual(maxAcceptableTime);
    });

    // Test ID: 168
    it('should get all products in an acceptable time (0 to 5 seconds) for 100 users at the same time', async () => {
        const concurrentUsers = 100;
        const maxAcceptableTime = 5000;

        const getProducts = async () => {
            const products = await productDAO.getProducts();
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
      const existingProductId = '65a47961cbe3389cb4892774';
      const product = await productDAO.getProduct(existingProductId);
      expect(product).toBeDefined();
      expect(product._id.toString()).toBe(existingProductId);
  });

    // Test ID: 170
    it('should reject to get a product with a non-existing ID', async () => {
        const nonExistingProductId = new mongoose.Types.ObjectId().toString();
        const product = await productDAO.getProduct(nonExistingProductId);
        expect(product).toBe(null);
    });
});
