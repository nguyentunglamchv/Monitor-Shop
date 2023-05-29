import { Category } from "./Category";
import { Rate } from "./Rate";

export class Product {
    'productId':number;
    'name':string;
    'quantity': number;
    'price': number;
    'discount':number;
    'image': string;
    'description': string;
    'enteredDate': Date;
    'category': Category;
    // 'rates': Rate[];

    constructor(productId:number) {
        this.productId = productId;
    }
}
