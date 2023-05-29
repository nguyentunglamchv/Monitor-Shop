import { Cart } from "./cart";
import { Product } from "./Product";

export class CartDetail {
    'id': number;
    'quantity': number;
    'price': number;
    'product': Product;
    'cart': Cart;

    constructor(id:number, quantity:number, price:number, product:Product, cart: Cart) {
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.product = product;
        this.cart = cart;
    }
}
