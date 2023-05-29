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
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  product!: Product;
  productsSuggest!: Product[];
  products!: Product[];
  id!: number;
  cId!: number;

  rateProduct!:Rate[];
  rates!:Rate[];
  ratesI!:Rate[];
  rateSize:number=5;
  rateLength!:number;
  rateAvg:number=0;

  cart!: Cart;
  cartDetail!: CartDetail;
  cartDetails!: CartDetail[];
  totalCartItem!: number;

  isLoading = true;

  user!:Customer;

  constructor(private route: ActivatedRoute, private productService: ProductService, private toastr: ToastrService,
    private router: Router, private cartService: CartService, private rateService: RateService, private localStorageService: LocalStorageService) {
    route.params.subscribe(val => {
      this.ngOnInit();
    })
  }

  ngOnInit(): void {
    this.cartService.$data.subscribe(data => {
      this.totalCartItem = data;
    })
    this.id = this.route.snapshot.params['id'];
    this.getProduct();
    this.getRateOfItem();
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
          this.router.navigate(['/home-page']);
        })
      }, error => {
          this.toastr.error('Sản phẩm này có thể đã hết hàng!', 'Hệ thống');
          this.router.navigate(['/home-page']);
      })
    } else {
      this.router.navigate(['/login']);
    }    
  }

  getProduct() {
    this.productService.getOne(this.id).subscribe(data => {
      this.product = data as Product;
      this.cId = this.product.category.categoryId;
      this.productService.getByCategory(this.cId).subscribe(data => {
        this.isLoading = false;
        this.productsSuggest = data as Product[];
        this.productService.getAll().subscribe(data => {
          this.products = data as Product[];
          this.productsSuggest = this.productsSuggest.concat(this.products);
        }, error => {
          this.toastr.error('Lỗi truy xuất dữ liệu!', 'Hệ thống');
        })
      }, error => {
        this.toastr.error('Lỗi truy xuất dữ liệu!', 'Hệ thống');
      })
    }, error => {
      this.toastr.error('Sản phẩm này có thể đã hết hàng!', 'Hệ thống');
      this.router.navigate(['/home-page']);
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

  getRateOfItem() {
    this.id = this.route.snapshot.params['id'];
    this.rateService.getByProduct(this.id).subscribe(data=>{
      this.ratesI = data as Rate[];
      var sum = 0;
      this.ratesI.forEach(item=>{
        sum += item.star;
      })
      if(sum==0) {
        this.rateAvg = 0;
      } else {
        this.rateAvg = sum/this.ratesI.length;
      }
      this.rateLength = this.ratesI.length;
    }, error=>{
      this.toastr.error('Lỗi! '+error.status, 'Hệ thống');
    })
  }

}
