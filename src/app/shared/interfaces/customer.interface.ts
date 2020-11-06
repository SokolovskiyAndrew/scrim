export interface CustomerInterface {
  id: number;
  name: string;
  city: string;
  orderTotal?: number;
  customerSince: Date | any;
}

export interface IOrderInterface {
  customerId: number;
  orderItems: IOrderItemInterface[];
}

export interface IOrderItemInterface {
  id: number;
  productName: string;
  itemCost: string;
}

