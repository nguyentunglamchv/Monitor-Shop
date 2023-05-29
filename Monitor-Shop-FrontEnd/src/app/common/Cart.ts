import { Customer } from "./Customer";

export class Cart {
    'id': number;
    'amount': number;
    'address': string;
    'phone': string;
    'status': boolean;
    'user': Customer;

    constructor(id:number) {
        this.id = id;
    }
}
