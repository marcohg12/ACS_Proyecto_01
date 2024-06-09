
import { Product as ProductModel } from "../../models/Product";
export interface IProductDAO {
    getProduct(productId: string): Promise<any>;
    getProducts(): Promise<any>;
    registerProduct(productToRegister: ProductModel): Promise<any>;
    updateProduct(productToUpdate: ProductModel): Promise<any>;
    updateProductUnits(productId: string, units: number): Promise<any>;
    deleteProduct(productId: string): Promise<any>;
}