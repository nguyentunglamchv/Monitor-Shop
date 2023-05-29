import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../common/cart';
import { CartDetail } from '../common/CartDetail';
import { Order } from '../common/Order';
import { OrderDetail } from '../common/OrderDetail';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  urlC = 'http://localhost:8989/api/cart';

  urlD = 'http://localhost:8989/api/cart-detail';

  totalCartItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  $data: Observable<number> = this.totalCartItems.asObservable();

  setData(total:number) {
    this.totalCartItems.next(total);
  }

  constructor(private httpClient: HttpClient) { }

  getAllDetail(cartId:number) {
    return this.httpClient.get(this.urlD+'/cart/'+cartId);
  }

  getOneDetail(detailId:number) {
    return this.httpClient.get(this.urlD+'/'+detailId);
  }

  getCart(userId: number) {
    return this.httpClient.get(this.urlC+'/user/'+userId);
  }

  updateCart(userId:number, cart: Cart) {
    return this.httpClient.put(this.urlC+'/user/'+userId, cart);
  }

  updateDetail(detail: CartDetail) {
    return this.httpClient.put(this.urlD, detail);
  }

  deleteDetail(detailId:number) {
    return this.httpClient.delete(this.urlD+'/'+detailId);
  }

  // getTotal(cartId: number) {
  //   return this.httpClient.get(this.urlD+'/cart/'+cartId);
  // }

  postDetail(detail: CartDetail) {
    return this.httpClient.post(this.urlD, detail);
  }
}
