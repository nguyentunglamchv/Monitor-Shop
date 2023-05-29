import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/common/cart';
import { CartDetail } from 'src/app/common/CartDetail';
import { Customer } from 'src/app/common/Customer';
import { Rate } from 'src/app/common/Rate';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductService } from 'src/app/services/product.service';
import { RateService } from 'src/app/services/rate.service';
import { Product } from '../../common/Product';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  products!: Product[];
  productsF!: Product[];
  isLoading = true;
  id!: number;
  brand!: string;

  cart!: Cart;
  cartDetail!: CartDetail;
  cartDetails!: CartDetail[];
  totalCartItem!: number;

  totalLength!: number;
  page: number = 1;

  key: string = '';
  keyF: string = '';
  reverse: boolean = true;

  rates!:Rate[];
  rateProduct!:Rate[];

  user!:Customer;

  constructor(private productService: ProductService, private toastr: ToastrService, private rateService: RateService,
    private route: Router, private router: ActivatedRoute, private cartService: CartService, private localStorageService: LocalStorageService) {
    router.params.subscribe(val => {
      this.ngOnInit();
    })
  }

  ngOnInit(): void {
    this.cartService.$data.subscribe(data => {
      this.totalCartItem = data;
    })
    this.getAll();
    this.getAllRate();
  }

  addCart(productId: number, price: number) {
    this.user = this.localStorageService.getUser();
    if(this.user != null) {
      this.cartService.getCart(this.user.userId).subscribe(data => {
        this.cart = data as Cart;
        this.cartDetail = new CartDetail(0, 1, price, new Product(productId), new Cart(this.cart.id));
        this.cartService.postDetail(this.cartDetail).subscribe(data => {
          this.toastr.success('Thêm vào giỏ hàng thành công!', 'Hệ thống!');
          this.cartService.getAllDetail(this.cart.id).subscribe(data => {
            this.cartDetails = data as CartDetail[];
            this.cartService.setData(this.cartDetails.length);
          })
        }, error => {
          this.toastr.error('Sản phẩm này có thể đã hết hàng!', 'Hệ thống');
          this.route.navigate(['/home-page']);
        })
      }, error => {
        this.toastr.error('Sản phẩm này có thể đã hết hàng!', 'Hệ thống');
        this.route.navigate(['/home-page']);
      })
    } else{
      this.route.navigate(['/login']);
    }
    
  }

  getAll() {
    this.id = this.router.snapshot.params['id'];
    this.productService.getByCategory(this.id).subscribe(data => {
      this.isLoading = false;
      this.products = data as Product[];
      this.productsF = this.products;
      this.totalLength = this.products.length;
      this.brand = this.products[0].category.categoryName;
    }, error => {
      this.toastr.error('Lỗi truy xuất dữ liệu!', 'Hệ thống');
    })
  }

  getAllRate() {
    this.rateService.getAll().subscribe(data=>{
      this.rates = data as Rate[];
    }, error=>{
      this.toastr.error('Lỗi truy xuất dữ liệu! '+error.status, 'Hệ thống');
    })
  }

  getStar(id:number):number {
    var length:number;
    this.rateProduct = [];
    for (const item of this.rates) {
      if(item.product.productId === id) {
        length = this.rateProduct.push(item);
      }
    }
    var star:number=0;
    for(const item of this.rateProduct) {
      star+=item.star;
    }
    if(this.rateProduct.length == 0) {
      return 0;
    }
    return star/this.rateProduct.length;
  }

  search(event: any) {
    const fValue = (event.target as HTMLInputElement).value;
    console.log(fValue);
    this.products = this.productsF.filter(p => p.name.toLowerCase().includes(fValue.toLowerCase()));
    this.totalLength = this.products.length;
  }

  sort(keyF: string) {
    console.log(keyF);
    if (keyF === 'enteredDate') {
      this.key = 'enteredDate';
      this.reverse = true;
    } else
      if (keyF === 'priceDesc') {
        this.key = 'price';
        this.reverse = true;
      } else
        if (keyF === 'priceAsc') {
          this.key = 'price';
          this.reverse = false;
        }
        else {
          this.key = '';
          this.reverse = true;
        }

  }


}
