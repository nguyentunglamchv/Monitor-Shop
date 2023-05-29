import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../common/Order';
import { OrderDetail } from '../common/OrderDetail';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  urlOD = 'http://localhost:8989/api/order-detail';

  urlO = 'http://localhost:8989/api/orders';

  constructor(private httpClient: HttpClient) { }

  checkOut(order: Order) {
    return this.httpClient.post(this.urlO, order);
  }

  getOrder(id:number) {
    return this.httpClient.get(this.urlO+'/'+id);
  }

  getByOrder(id:number) {
    return this.httpClient.get(this.urlOD+'/order/'+id);
  }

  getOD(id:number) {
    return this.httpClient.get(this.urlOD+'/'+id);
  }

  putOD(id:number, orderDetail: OrderDetail) {
    return this.httpClient.put(this.urlOD+'/'+id, orderDetail);
  }

  saveOrderDetail(orderDetail: OrderDetail) {
    return this.httpClient.post(this.urlOD, orderDetail);
  }

  update(id:number, order:Order) {
    return this.httpClient.put(this.urlO+'/'+id, order);
  }

  getByUser(id:number) {
    return this.httpClient.get(this.urlO+'/user/'+id);
  }

  getWait(id:number) {
    return this.httpClient.get(this.urlO+'/user/wait/'+id);
  }

  getConfirm(id:number) {
    return this.httpClient.get(this.urlO+'/user/confirmed/'+id);
  }

  getPaid(id:number) {
    return this.httpClient.get(this.urlO+'/user/paid/'+id);
  }

  getCancel(id:number) {
    return this.httpClient.get(this.urlO+'/user/cancel/'+id);
  }
}
