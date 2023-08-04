import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { SingleproductComponent } from './pages/singleproduct/singleproduct.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { FilterproductsComponent } from './pages/filterproducts/filterproducts.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminAuthGuard } from './auth/auth.guard';
import { CartComponent } from './shared/cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'home',
    pathMatch: 'full',
    redirectTo: '/'
  },
  { path: 'singleproduct/:id', component: SingleproductComponent },
  { path: 'wishlist', component: WishlistComponent},
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminAuthGuard]},
  { path: 'registeruser', component: RegisterComponent},
  { path: 'allproducts', component: FilterproductsComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'cart', component: CartComponent},
  { path: '**', component: NotfoundComponent } // Wildcard route for 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
