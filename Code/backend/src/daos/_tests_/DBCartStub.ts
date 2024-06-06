import { IDBCart } from "./IDBCart";
import { Publication as PublicationModel } from "../../models/Publication";
import { Product as ProductModel } from "../../models/Product";

class DBCartStub implements IDBCart {
  cartData: { [userId: string]: { products: { productRef: string; units: number }[] } };
  products: ProductModel[];
  publications: PublicationModel[]
  orderData: any[];

  constructor() {
    this.cartData = {};
    this.orderData = [];
    this.products = [];
    this.publications = [];

    for (let i = 1; i <= 100; i++) {
      const productId = `product${i}`;
      const userId = `user${i % 10 + 1}`;
      this.addProduct(productId, 5, userId);
    }
  }

  async getCart(idUser: string): Promise<{ products: any[] }> {
    if (idUser.includes("user")) {
      const cart = this.cartData[idUser] || { products: [] };
      return cart;
    } else {
      throw new Error("Invalid User");
    }
  }

  async addProduct(idProduct: string, units: number, idUser: string): Promise<any> {
    if (!idUser.includes("user")) {
      throw new Error("Invalid User");
    }
    if (!this.cartData[idUser]) {
      this.cartData[idUser] = { products: [] };
    }
    this.cartData[idUser].products.push({ productRef: idProduct, units });
  }

  async deleteProduct(idProduct: string, idUser: string): Promise<any> {
    if (!idUser.includes("user")) {
      throw new Error("Invalid User");
    }
  }

  async updateUnits(idProduct: string, units: number, idUser: string): Promise<any> {
    if (!idUser.includes("user")) {
      throw new Error("Invalid User");
    }
    const filter = {
      client: idUser,
      "products.productRef": idProduct,
    };
    const update = {
      $set: {
        "products.$.units": units,
      },
    };
  }

  async findProduct(idProduct: string, idUser: string): Promise<number> {
    if (!idUser.includes("user")) {
      throw new Error("Invalid User");
    }
    return 2;
  }

  async deleteAll(idUser: string): Promise<any> {
    if (this.cartData[idUser]) {
      this.cartData[idUser].products = [];
    }
  }

  async registerOrder(
    client: string,
    orderDate: Date,
    address: string,
    priceWithDelivery: number,
    lineProducts: { id: string; name: string; units: number; price: number }[],
    state: number
  ): Promise<any> {
    if (!client.includes("user")) {
      throw new Error("Invalid User");
    }
    const orderId = this.orderData.length + 1;
    const order = {
      _id: orderId,
      clientRef: client,
      orderDate: orderDate,
      address: address,
      price: priceWithDelivery,
      photoOfPayment: "TEMPORAL",
      lineProducts: lineProducts,
      state: state,
    };
    this.orderData.push(order);
    return orderId;
  }
  
}

export default DBCartStub;


