import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { HttpClientModule } from '@angular/common/http';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';


import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SalesComponent } from './pages/home/sales/sales.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { FeaturedproductsComponent } from './components/featuredproducts/featuredproducts.component';
import { SingleproductComponent } from './pages/singleproduct/singleproduct.component';
import { FilterproductsComponent } from './pages/filterproducts/filterproducts.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { ProductdashboardComponent } from './admin-dashboard/productdashboard/productdashboard.component';
import { UsersdashboardComponent } from './admin-dashboard/usersdashboard/usersdashboard.component';
import { CartdashboardComponent } from './admin-dashboard/cartdashboard/cartdashboard.component';
import { CartComponent } from './shared/cart/cart.component';
import { AddToCartComponent } from './shared/addtocart/addtocart.component';




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    SalesComponent,
    NotfoundComponent,
    FeaturedproductsComponent,
    SingleproductComponent,
    FilterproductsComponent,
    WishlistComponent,
    AdminDashboardComponent,
    RegisterComponent,
    ProfileComponent,
    LoginComponent,
    ProductdashboardComponent,
    UsersdashboardComponent,
    CartdashboardComponent,
    CartComponent,
    AddToCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    CarouselModule,
    HttpClientModule,
    DividerModule,
    DropdownModule,
    FormsModule,
    CheckboxModule,
    BadgeModule,
    ToastModule,
    MessagesModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    TabViewModule,
    InputTextareaModule,
    ImageModule,
    InputNumberModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
