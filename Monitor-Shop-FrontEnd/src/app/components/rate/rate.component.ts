import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/common/Customer';
import { Product } from 'src/app/common/Product';
import { Rate } from 'src/app/common/Rate';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
  star:number=5;
  comment!:string;
  rate!:Rate;
  user!:Customer;

  @Input() product!:Product;

  constructor(private modalService: NgbModal, private rateService: RateService, private toastr: ToastrService, private localStorageService: LocalStorageService) { 
  }

  ngOnInit(): void {
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, {centered: true})
  }

  rating() {
    this.user = this.localStorageService.getUser();
    this.rate = new Rate(0, this.star, this.comment, new Date(), this.product , new Customer(this.user.userId));
    this.rateService.post(this.rate).subscribe(data=>{
      this.toastr.success('Đánh giá thành công!', 'Hệ thống');
      this.modalService.dismissAll();
    })
    
  }

}
