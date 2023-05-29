export class Customer {
    'userId':number;
    'name': string;
    'email': string;
    'password': string;
    'gender': boolean;
    'address': string;
    'phone': string;
    'image': string;
    'registerDate': Date;
    'status': boolean;
    'role': boolean;

    constructor(id:number) {
        this.userId = id;
    }
}
