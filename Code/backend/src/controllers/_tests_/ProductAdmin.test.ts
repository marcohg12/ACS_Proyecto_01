import { Product } from "../../models/Product";
import { ProductDAOStub } from './ProductDaoStub';
import { ProductAdmin } from "../ProductAdmin";
jest.mock("fs")

describe('registerProduct function', () => {  
  let productAdmin: ProductAdmin;
  let productDAOStub: ProductDAOStub;

  beforeEach(() => {
    productDAOStub = new ProductDAOStub();
    productAdmin = new ProductAdmin(productDAOStub);
  });

  //Test Case ID: 134
  it('registers a product if receiving a product object', async () => {
    const product = new Product(
      "Product Description",
      "photo.jpg",
      "Product Name",
      10, 
      100, 
      "1234567890" 
    );

    await expect(productAdmin.registerProduct(product))
    .resolves
    .not.toThrow();
  });
  
  //Test Case ID: 135
  it('rejects to register a product if receiving an object different from product', async () => {
    const invalidObject: any = {
        getDescription: () => "Description",
        getUnits: () => 2
      };

    await expect(productAdmin.registerProduct(invalidObject)).rejects.toThrow("Invalid product object");
   });

   //Test Case ID: 136
  it('updates a product if receiving a product object', async () => {
    const product = new Product(
      "Product Description",
      "photo.jpg",
      "Product Name",
      10, 
      100, 
      "1234567890" 
    );

    const productId = await productAdmin.updateProduct(product);
    expect(productId).toBeDefined();
  });
  
  //Test Case ID: 137
    it('rejects to update a product if receiving an object different from product', async () => {
    const invalidObject: any = {
        getDescription: () => "Description",
        getUnits: () => 2
      };

    await expect(productAdmin.updateProduct(invalidObject)).rejects.toThrow("Invalid product object");
   });

   //Test Case ID: 138
   it('should delete a product with an existing ID', async () => {
    const existingProductId = 'existingProductId123';

    await expect(productAdmin.deleteProduct(existingProductId))
      .resolves
      .not.toThrow();
  });

  //Test Case ID: 139
  it('should reject to delete a product with a non-existent ID', async () => {
    const nonExistingId = 'nonexistingid';

    jest.spyOn(productDAOStub, 'getProduct').mockResolvedValue(null);

    await expect(productAdmin.deleteProduct(nonExistingId))
      .rejects
      .toThrow(`Product with ID ${nonExistingId} not found`);
  });

  //Test Case ID: 140
  it('should get all products in an acceptable time (0 to 2 seconds)', async () => {
    const start = Date.now();
    const products = await productAdmin.getProducts();
    const duration = Date.now() - start;

    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    expect(duration).toBeLessThanOrEqual(2000); // 2 segundos
  });

  it('should get a product with an existing ID', async () => {
    const existingProductId = '2';

    const product = await productAdmin.getProduct(existingProductId);
    expect(product).toBeDefined();
    expect(product?.getID()).toBe(existingProductId);
  });

  it('should reject to get a product with a non-existent ID', async () => {
    const nonExistingId = 'nonexistingid';

    await expect(productAdmin.getProduct(nonExistingId))
      .rejects
      .toThrow(`Product with ID ${nonExistingId} not found`);
  });

});