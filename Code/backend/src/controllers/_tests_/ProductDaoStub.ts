import { IProductDAO } from "./IProductDAO";
import { Product, Product as  ProductModel } from "../../models/Product";
import mongoose from "mongoose";

class ProductDAOStub implements IProductDAO {
  private products: ProductModel[];

  constructor() {
    this.products = [
      new Product("Description 1", "/photos/products/1.png", "Product 1", 10, 100, "existingProductId123"),
      new Product("Description 2", "/photos/products/2.png", "Product 2", 20, 200, "2"),
      // Agrega más productos si es necesario
    ];
  }

  private isValidProduct(product: any): boolean {
    return (
      product instanceof Product &&
      typeof product.getName === 'function' &&
      typeof product.getDescription === 'function' &&
      typeof product.getUnits === 'function' &&
      typeof product.getPrice === 'function' &&
      typeof product.getPhoto === 'function'
    );
  }

  public async registerProduct(productToRegister: Product) {
    if (!this.isValidProduct(productToRegister)) {
      throw new Error("Invalid product object");
    }
    const fakeId = new mongoose.Types.ObjectId().toString();
    productToRegister.setId(fakeId);  // Asegúrate de que el ID se establece en el producto
    this.products.push(productToRegister);
  }

  public async getProduct(productId: string) {
    const product = this.products.find(product => product.getID() === productId);
    if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
    }
    return product;
}

  public async getProducts() {
    return [...this.products];
  }

  public async deleteProduct(productId: string): Promise<{ nDeleted: number }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          if (productId === "nonexistentid") {
              reject(new Error('Publication not found'));
          } else {
              resolve({ nDeleted: 1 });
          }
      }, 1000); 
  });
  }

  public async updateProduct(productToUpdate: Product) {
    if (!this.isValidProduct(productToUpdate)) {
      throw new Error("Invalid product object");
  }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ nModified: 1 });
      }, 1000); 
    });
  }

  public async updateProductUnits(productId: string, units: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ nModified: 1 });
      }, 1000); 
    });
  }
}

export { ProductDAOStub };
