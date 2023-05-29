import { Customer } from "./Customer";

export class Order {
    'id': number;
    'amount': number;
    'address': string;
    'phone':string;
    'orderDate': Date;
    'status': number;
    'user': Customer;

    constructor(id:number, amount:number, address:string, phone:string, orderDate:Date, status:number, user:Customer) {
        this.id = id;
        this.amount = amount;
        this.address = address;
        this.phone = phone;
        this.orderDate = orderDate;
        this.status = status;
        this.user = user;
    }
}
