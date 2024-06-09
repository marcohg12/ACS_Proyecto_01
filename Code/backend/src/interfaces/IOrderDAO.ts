export interface IOrderDAO {
  getOrders(): Promise<any>;
  getOrdersUser(idUser: string): Promise<any>;
  getDetail(orderId: string): Promise<any>;
  changeOrderState(orderId: string, newState: number): Promise<any>;
  setDeliveryDate(orderId: string, date: Date): Promise<any>;
}
