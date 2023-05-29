import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/common/Order';
import { OrderDetail } from 'src/app/common/OrderDetail';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  rating=3;

  orderDetails!:OrderDetail[];
  order!:Order;
  listOrderDetail!: MatTableDataSource<OrderDetail>;
  orderDetailLength!:number;
  columns: string[] = ['index', 'image', 'productName', 'price', 'quantity', 'rating'];

  @Input() orderId!:number;

  constructor(private modalService: NgbModal, private orderService: OrdersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getOrderDetail();
    this.getOrder();
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, {centered: true, size: 'lg'})
  }

  getOrder() {
    this.orderService.getOrder(this.orderId).subscribe(data=>{
      this.order = data as Order;
    },error=>{
      this.toastr.error('Lỗi! '+error.status, 'Hệ thống');
    })
  }

  getOrderDetail() {
    this.orderService.getByOrder(this.orderId).subscribe(data=>{
      this.orderDetails = data as OrderDetail[];
      this.listOrderDetail = new MatTableDataSource(this.orderDetails);
      this.orderDetailLength = this.orderDetails.length;
    }, error=>{
      this.toastr.error('Lỗi! '+error.status, 'Hệ thống');
    })
  }

}
