import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/common/Customer';
import { Order } from 'src/app/common/Order';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { OrdersService } from 'src/app/services/orders.service';
import { SendmailService } from 'src/app/services/sendmail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer!: Customer;
  customerId!: number;

  isLoadingOrder = true;

  order!: Order;
  orders!: Order[];
  listOrder!: MatTableDataSource<Order>;
  orderLength!: number;
  columns: string[] = ['id', 'amount', 'address', 'phone', 'orderDate', 'status', 'view', 'action'];

  user!: Customer;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private customerService: CustomerService, private toastr: ToastrService, private orderService: OrdersService,
    private localStorageService: LocalStorageService, private router: Router, private sendmailService: SendmailService) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    this.user = this.localStorageService.getUser();
    if (this.user != null) {
      this.customerId = this.user.userId;
      this.getCustomer();
      this.getOrder();
    } else {
      this.router.navigate(['/login']);
    }
  }

  getCustomer() {
    this.customerService.getOne(this.customerId).subscribe(data => {
      this.customer = data as Customer;
    }, error => {
      this.toastr.error('Lỗi truy xuất dữ liệu!', 'Hệ thống');
    })
  }

  getOrder() {
    this.orderService.getByUser(this.customerId).subscribe(data => {
      this.isLoadingOrder = false;
      this.orders = data as Order[];
      this.listOrder = new MatTableDataSource(this.orders);
      this.listOrder.sort = this.sort;
      this.listOrder.paginator = this.paginator;
      this.orderLength = this.orders.length;
    }, error => {
      this.toastr.error('Lỗi! ' + error.status, 'Hệ thống');
    })
  }

  cancel(orderId: number) {
    Swal.fire({
      title: 'Bạn có muốn huỷ đơn hàng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonText: 'Không',
      confirmButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.getOrder(orderId).subscribe(data => {
          this.order = data as Order;
          this.order.status = 0;
          this.orderService.update(this.order.id, this.order).subscribe(data => {
            this.toastr.success('Huỷ thành công !', 'Hệ thống');
            this.sendmailService.sendMailOrder(data as Order).subscribe(data=>{              
            })
            this.ngOnInit();
          }, error => {
            this.toastr.error('Lỗi! ' + error.status, 'Hệ thống');
          })
        }, error => {
          this.toastr.error('Lỗi! ' + error.status, 'Hệ thống');
        })
      }
    })
  }

  finish() {
    this.ngOnInit();
  }

}
