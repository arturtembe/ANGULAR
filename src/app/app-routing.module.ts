import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AddProductComponent } from './components/dashboard/product/add-product/add-product.component';
import { AddCategoriaComponent } from './components/dashboard/categoria/add-categoria/add-categoria.component';
import { ViewCategoriaComponent } from './components/dashboard/categoria/view-categoria/view-categoria.component';
import { EditCategoriaComponent } from './components/dashboard/categoria/edit-categoria/edit-categoria.component';
import { ViewProductComponent } from './components/dashboard/product/view-product/view-product.component';
import { EditProductComponent } from './components/dashboard/product/edit-product/edit-product.component';
import { ViewDashboardComponent } from './components/dashboard/view-dashboard/view-dashboard.component';
import { VerifyComponent } from './components/verify/verify.component';

const routes: Routes = [
  //{path:'',component:HomeComponent},
  // User
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'forget-password',component:ForgotPasswordComponent},
  // Verify
  {path:':slug/verify',component:VerifyComponent},
  {path:':slug/verify/:otp',component:VerifyComponent},
  // Dashbord
  {path:':slug',component:ViewDashboardComponent},
  {path:'dashboard',component:ViewDashboardComponent},
  {path:'dashboard/product',component:ViewProductComponent},
  {path:'dashboard/product/add',component:AddProductComponent},
  {path:'dashboard/product/edit/:id',component:EditProductComponent},
  {path:'dashboard/categoria',component:ViewCategoriaComponent},
  {path:'dashboard/categoria/add',component:AddCategoriaComponent},
  {path:'dashboard/categoria/edit/:id',component:EditCategoriaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
