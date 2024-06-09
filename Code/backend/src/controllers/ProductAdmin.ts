import { ProductDAO } from "../daos/ProductDAO";
import { Product } from "../models/Product";
import { IProductDAO } from "../interfaces/IProductDAO";
const fs = require("fs");

class ProductAdmin {
  private productDAO: ProductDAO = new ProductDAO();

  constructor(productDAO: IProductDAO) {
    this.productDAO = productDAO;
  }

  private isValidProduct(product: any): boolean {
    return (
      product instanceof Product &&
      typeof product.getName === "function" &&
      typeof product.getDescription === "function" &&
      typeof product.getUnits === "function" &&
      typeof product.getPrice === "function" &&
      typeof product.getPhoto === "function"
    );
  }

  // Registra un producto
  public async registerProduct(product: Product) {
    if (!this.isValidProduct(product)) {
      throw new Error("Invalid product object");
    }
    const productId = await this.productDAO.registerProduct(product);
    // Guardamos la foto en el sistema de archivos
    await fs.rename(
      product.getPhoto(),
      "photos/products/" + productId + ".png"
    );
  }

  // Actualiza los datos de un producto
  public async updateProduct(product: Product) {
    if (!this.isValidProduct(product)) {
      throw new Error("Invalid product object");
    }
    // Si hay una foto nueva
    if (product.getPhoto() !== "") {
      // Eliminamos la foto anterior
      await fs.unlink("photos/products/" + product.getID() + ".png", () => {});
      // Guardamos la nueva foto
      await fs.renameSync(
        product.getPhoto(),
        "photos/products/" + product.getID() + ".png"
      );
    }
    return await this.productDAO.updateProduct(product);
  }

  // Elimina un producto por su Id
  public async deleteProduct(productId: string): Promise<void> {
    const product = await this.productDAO.getProduct(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    // Eliminamos la foto del sistema de archivos
    try {
      await fs.unlink(`photos/products/${productId}.png`);
    } catch (err) {
      console.error(
        `Failed to delete photo for product ID ${productId}: ${err.message}`
      );
    }

    // Eliminamos el producto de la BD
    await this.productDAO.deleteProduct(productId);
  }

  // Retorna todos los productos registrados
  public async getProducts() {
    return await this.productDAO.getProducts();
  }

  // Retorna el producto con el Id enviado por parámetro
  public async getProduct(productId: string) {
    const product = await this.productDAO.getProduct(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    return product;
  }
}

export { ProductAdmin };
