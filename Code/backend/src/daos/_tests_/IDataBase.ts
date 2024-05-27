export interface IDataBase {
    getCart(idUser: string): Promise<{ products: any[] }>;
    addProduct(idProduct: string, units: Number, idUser: string): Promise<any>;
    deleteProduct(idProduct: string, idUser: string): Promise<any>;
    updateUnits(idProduct: String, units: Number, idUser: String): Promise<any>;
    findProduct(idProduct: String, idUser: String): Promise<number>;
    deleteAll(idUser: String): Promise<any>;
    registerOrder(
      client: string,
      orderDate: Date,
      address: string,
      priceWithDelivery: Number,
      lineProducts: { id: string; name: string; units: number; price: number }[],
      state: Number
    ): any;
  }