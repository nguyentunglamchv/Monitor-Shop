import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/common/Customer';
import { Login } from 'src/app/common/Login';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  show: boolean = false;
  postForm: FormGroup;
  login!: Login;
  user!: Customer;

  constructor(private userService: CustomerService, private localStorageService: LocalStorageService, private toastr: ToastrService,
    private router: Router) {
    this.postForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    this.user = this.localStorageService.getUser();
    if (this.user != null) {
      this.router.navigate(['/home-page']);
    }
  }

  Login() {
    this.login = this.postForm.value;
    this.userService.login(this.login).subscribe(data=>{
      this.localStorageService.saveLogin(data as Customer);
      Swal.fire({
        icon: 'success',
        title: 'Đăng nhập thành công!',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.href = ('/');
    }, error=>{
      if(error.status == 404) {
        this.toastr.error('Tài khoản không hợp lệ!', 'Hệ thống');
      } else {
        this.toastr.error('Mật khẩu không đúng!', 'Hệ thống');
      }
      
    })
  }

  password() {
    this.show = !this.show;
  }

}
