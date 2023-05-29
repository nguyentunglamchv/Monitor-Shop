import { Customer } from "./Customer";
import { Product } from "./Product";

export class Rate {
    'id': number;
    'star': number;
    'comment': string;
    'rateDate': Date;
    'product': Product;
    'user': Customer;

    constructor(id:number, star:number, comment:string, rateDate: Date, product:Product, user: Customer) {
        this.id = id;
        this.star = star;
        this.comment = comment;
        this.rateDate = rateDate;
        this.product = product;
        this.user = user;
    }
}
