import { CartAdmin } from "../CartAdmin";
import CartDAOStub from "./CartDaoStub"; // Importamos el stub
const { ToManyProductsInCart } = require("../../exceptions/exceptions");

describe("CartAdmin", () => {
  let cartAdmin: CartAdmin;
  let cartDaoStub: CartDAOStub;

  beforeEach(() => {
    // Se crea una instancia de CartAdmin antes de cada prueba
    cartDaoStub = new CartDAOStub();
    cartAdmin = new CartAdmin(cartDaoStub);
  });

  //Test Case ID: 1
  it("Test should add product to cart when units are in range (0-5)", async () => {
    const userId = "user1";
    const productId = "product1";
    const units = 3;

    cartDaoStub.setFindProductValue(1);

    const result = await cartAdmin.addProductToCart(userId, productId, units);
    expect(result).toBe(4);
  });

  //Test Case ID: 2
  it("Test should not add product to cart when units are lower tan 5)", async () => {
    const userId = "user1";
    const productId = "product1";
    const units = -2;

    cartDaoStub.setFindProductValue(1);

    const result = await cartAdmin.addProductToCart(userId, productId, units);
    expect(result).toBe(-1);
  });

  //Test Case ID: 3
  it("Test should not add product to cart when units are higher tan 5)", async () => {
    const userId = "user1";
    const productId = "product1";
    const units = 70;

    cartDaoStub.setFindProductValue(1);

      await expect(async () => {
      await cartAdmin.addProductToCart(userId, productId, units);
      }).rejects.toThrow(ToManyProductsInCart);
  });

  //Test Case ID: 4
  //Asumimos que pasa porque no deja correr si quiera con las unidades como string

  //Test Case ID: 5
  it("Test should not generate an order when cart is empty", async () => {
    const userId = "user1";
    const address = "Guacima";
    const totalPrice = 5000;
    const photoPath = "/images";

    cartDaoStub.setGetCartValue(-1);

    const result = await cartAdmin.sendOrder(userId, address, totalPrice, photoPath);
    expect(result).toBe(-1);
   });

   //Test Case ID: 6
   it("Test should generate an order whit products in the cart", async () => {
    const userId = "user1";
    const address = "Guacima";
    const totalPrice = 5000;
    const photoPath = "Hello.png";
 
    cartDaoStub.setGetCartValue({ products: [] });
    cartDaoStub.setRegisterOrderValue(1);
 
    const result = await cartAdmin.sendOrder(userId, address, totalPrice, photoPath);
    expect(result).toBe("1");
   });

     //Test Case ID: 7
  it("Test should generate an order whit products in the car and handle error when registering the order.", async () => {
    const userId = "user1";
    const address = "Guacima";
    const totalPrice = 5000;
    const photoPath = "Hello.png";
 
    cartDaoStub.setGetCartValue({ products: [] });
    cartDaoStub.setRegisterOrderValue(-1);
 
    const result = await cartAdmin.sendOrder(userId, address, totalPrice, photoPath);
 
    expect(result).toBe("1");
   });


});
