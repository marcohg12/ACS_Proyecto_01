import { Product as ProductModel } from "../../models/Product";

export interface IDBProduct {
    getProduct(productId: string): Promise<any | null>;
    getProducts(): Promise<any | null>;
    registerProduct(productToRegister: ProductModel): Promise<any | null>;
    updateProduct(productToUpdate: ProductModel): Promise<any | null>;
    updateProductUnits(productId: string, units: number): Promise<any | null>;
    deleteProduct(productId: string): Promise<any | null>;
  }