import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/common/Customer';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SendmailService } from 'src/app/services/sendmail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  postForm:FormGroup
  user!:Customer
  data!:any
  check:boolean = false;

  constructor(private localStorageService: LocalStorageService, private router:Router, private toastr: ToastrService, 
    private sendMailService: SendmailService, private userService:CustomerService) { 
    this.postForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'otp': new FormControl(null, Validators.required),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'passwordConfirm': new FormControl(null, [Validators.required, Validators.minLength(6)]),      
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

  checkPasswordConfirm(event:any) {    
    const passwordConfirm = (event.target as HTMLInputElement).value;
    if(this.postForm.value.password != passwordConfirm) {
      this.check = true;
    } else {
      this.check = false;
    }
  }

  checkPassword(event:any) {    
    const passwordConfirm = (event.target as HTMLInputElement).value;
    if(this.postForm.value.passwordConfirm != passwordConfirm) {
      this.check = true;
    } else {
      this.check = false;
    }
  }

  updatePassword() {    
    if(this.postForm.valid) {
      this.data = localStorage.getItem("otp-forgot-password");
      if (this.postForm.value.otp == JSON.parse(this.data)){
        this.userService.getOneByEmail(this.postForm.value.email).subscribe(data=>{
          this.user = data as Customer;
          this.user.status = true
          this.user.password = this.postForm.value.password;
          this.userService.put(this.user.userId, this.user).subscribe(data=>{
            Swal.fire({
              icon: 'success',
              title: 'Đổi mật khẩu thành công!',
              showConfirmButton: false,
              timer: 1500
            })
            window.location.href = '/';
          }, error=>{
            this.toastr.error('Đổi mật khẩu thất bại !', 'Hệ thống');
            window.location.href = '/';
          })
        })
      } else {
        this.toastr.error('Mã OTP không đúng ! Hãy kiểm tra lại', 'Hệ thống');
      }
    } else {
      this.toastr.error('Hãy nhập đầy đủ thông tin !', 'Hệ thống');
    }
  }

  sendOtp() {
    this.sendMailService.sendMailOtpForgotPassword(this.postForm.value.email).subscribe(data => {
      window.localStorage.removeItem("otp-forgot-password");
      window.localStorage.setItem("otp-forgot-password", JSON.stringify(data));
      this.toastr.success('Chúng tôi đã gửi mã OTP về email của bạn !', 'Hệ thống');
    }, error => {
      if (error.status == 404) {
        this.toastr.error('Email này không tồn tại trên hệ thống !', 'Hệ thống');
      } else {
        this.toastr.warning('Hãy nhập đúng email !', 'Hệ thống');
      }
    })
  }

  sendError() {
    this.toastr.warning('Hãy nhập đúng email!', 'Hệ thống')
  }

}
