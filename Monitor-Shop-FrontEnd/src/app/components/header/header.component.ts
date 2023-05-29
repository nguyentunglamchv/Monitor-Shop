import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/common/cart';
import { CartDetail } from 'src/app/common/CartDetail';
import { Customer } from 'src/app/common/Customer';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Category } from '../../common/Category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories!: Category[];
  cart!:Cart;
  cartDetails!:CartDetail[];
  totalCartItem!:number;
  customerId!:number;

  user!:Customer;

  constructor(private categoryService: CategoryService, private toastr: ToastrService, 
    private cartService: CartService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.cartService.$data.subscribe(data=>{
      this.totalCartItem = data;
    })
    this.getAll();
    this.getUser();
  }

  getUser() {
    this.user = this.localStorageService.getUser();
    this.customerId = this.user.userId;
    if(this.user==null) {
      this.cartService.setData(0);
    } else {
      this.getTotalCartItem();
    }
  }

  logout() {
    this.localStorageService.logout();
    window.location.href = '/';
  }
  

  getTotalCartItem() {
    this.cartService.getCart(this.customerId).subscribe(data=>{
      this.cart = data as Cart;
      this.cartService.getAllDetail(this.cart.id).subscribe(data=>{
        this.cartDetails = data as CartDetail[];
        this.cartService.setData(this.cartDetails.length);
      })
    }, error=>{
      this.toastr.error('Lỗi truy xuất dữ liệu!', 'Hệ thống');
    })
  }

  getAll() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data as Category[];      
    }, error => {
      this.toastr.error('Lỗi truy xuất dữ liệu!', 'Hệ thống');
    })
  }

}
