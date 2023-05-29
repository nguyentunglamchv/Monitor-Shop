import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CartsComponent } from './components/carts/carts.component';
import { BrandComponent } from './components/brand/brand.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { RateComponent } from './components/rate/rate.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home-page' },
  { path: 'home-page', component: HomePageComponent },
  { path: 'item-detail/:id', component: ItemDetailComponent },
  { path: 'carts', component: CartsComponent },
  { path: 'brand/:id', component: BrandComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '**', component: NotfoundComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    ItemDetailComponent,
    CartsComponent,
    BrandComponent,
    CustomerComponent,
    EditProfileComponent,
    OrderDetailComponent,
    RateComponent,
    LoginComponent,
    NotfoundComponent,
    RegisterComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    OrderModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      // progressBar: true,
      progressAnimation: 'increasing',
      // preventDuplicates: true,
      closeButton: true,
      // newestOnTop: false,
    }),
    RouterModule.forRoot(routes, { enableTracing: true }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
