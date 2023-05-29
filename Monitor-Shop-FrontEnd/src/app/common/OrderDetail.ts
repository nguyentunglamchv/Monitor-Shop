import { Order } from "./Order";
import { Product } from "./Product";

export class OrderDetail {
    'id': number;
    'quantity': number;
    'price': number;
    'product': Product;
    'order': Order;

    constructor(id:number, quantity:number, price:number, product:Product, order: Order) {
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.product = product;
        this.order = order;
    }
}
