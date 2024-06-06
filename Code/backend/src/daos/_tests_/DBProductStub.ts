import { IDBProduct } from "./IDBProduct";
import { Product as ProductModel } from "../../models/Product";

class DBProdcutStub implements IDBProduct {
  products: ProductModel[];
  cartData: { [userId: string]: { products: { productRef: string; units: number }[] } };

  constructor() {
    this.products = [];
    this.cartData = {
      'client1': { products: [{ productRef: 'product1', units: 2 }, { productRef: 'product2', units: 3 }] },
      'client2': { products: [{ productRef: 'product2', units: 1 }, { productRef: 'product3', units: 4 }] }
    };
    this.reSetProducts();
  }

  private isValidProduct(product: any): product is ProductModel {
    return (
      product instanceof ProductModel &&
      typeof product.getName === 'function' &&
      typeof product.getDescription === 'function' &&
      typeof product.getUnits === 'function' &&
      typeof product.getPrice === 'function' &&
      typeof product.getPhoto === 'function'
    );
  }

  async setProducts(products: []){
    this.products = products
  }

  async reSetProducts(){
    this.products.push(new ProductModel('description1', 'photo1', 'Product1', 10, 100, 'product1'));
    this.products.push(new ProductModel('description2', 'photo2', 'Product2', 20, 200, 'product2'));
    for (let i = 1; i <= 100; i++) {
      const product = new ProductModel(
        `Description for product ${i}`,
        `photo${i}.jpg`,
        `Product ${i}`,
        2 + i, 
        10.0 * i, 
        `product${i}`
      );
      this.products.push(product);
    }
  }

  async getProduct(id: string): Promise<ProductModel | null> {
    const product = this.products.find(product => product.getID() === id);
    return product || null;
  }

  async getProducts(): Promise<ProductModel[]> {
    return this.products;
  }

  async registerProduct(productToRegister: ProductModel): Promise<string | null> {
    if (productToRegister instanceof ProductModel) {
      this.products.push(productToRegister);
      return "fakeProductId";
    } else {
      return null;
    }
  }

  async updateProduct(productToUpdate: ProductModel): Promise<string | null> {
    if (!this.isValidProduct(productToUpdate)) {
      return null;
    }else{
      return "fakeProductId";
    }
  }

  async updateProductUnits(productId: string, units: number): Promise<any> {
    throw new Error("Method not implemented");
  }

  private removeFromCarts(productId: string): void {
    for (const userId in this.cartData) {
      if (this.cartData.hasOwnProperty(userId)) {
        this.cartData[userId].products = this.cartData[userId].products.filter(product => product.productRef !== productId);
      }
    }
  }

  async deleteProduct(productId: string): Promise<string> {
    if (productId === 'nonExistingProduct'){
      return null
    }else{
      this.removeFromCarts("product1")
      return "fakeProductId";
    }
  }
  
}

export default DBProdcutStub;