import { ICartDAO } from "./ICartDAO";
class CartDAOStub implements ICartDAO {
  private addProductValue: number;
  private findProductValue: number;
  private getCartValue: any; 
  private registerOrderValue: any;

  async findProduct(productId: string, userId: string): Promise<number> {
    return Promise.resolve(this.findProductValue);
  }

  async addProduct(
    productId: string,
    units: number,
    userId: string,
  ): Promise<any> {
    // Simulamos la adición de un producto al carrito
    return Promise.resolve(this.addProductValue + units);
  }

  public setAddProductValue(val: number): void {
    this.addProductValue = val;
  }

  public setFindProductValue(val: number): void {
    this.findProductValue = val;
  }

  async updateUnits(
    productId: string,
    units: number,
    userId: string
  ): Promise<any> {
    // Simulamos la actualización de unidades de un producto en el carrito
    return Promise.resolve(units);
  }

  // Stub para el método getCart
  async getCart(userId: string): Promise<any> {
    return Promise.resolve(this.getCartValue);
  }

  public setGetCartValue(val: any): void{
    this.getCartValue = val;
  }

  // Stub para el método deleteProduct
  async deleteProduct(productId: string, userId: string): Promise<void> {
    return Promise.resolve();
  }

  // Stub para el método deleteAll
  async deleteAll(userId: string): Promise<void> {
    return Promise.resolve();
  }

  // Stub para el método registerOrder
  async registerOrder(
    client: string,
    orderDate: Date,
    address: string,
    priceWithDelivery: Number,
    lineProducts: { id: string; name: string; units: Number; price: Number }[],
    state: Number
  ): Promise<string> {
    return Promise.resolve("1");
  }

  public setRegisterOrderValue(val: any): void{
    this.registerOrderValue = val;
  }
}

export default CartDAOStub;
