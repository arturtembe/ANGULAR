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
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

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
  //{path:'dashboard',component:ViewDashboardComponent},
  {path:':slug/product',component:ViewProductComponent},
  {path:':slug/product/add',component:AddProductComponent},
  {path:':slug/product/edit/:id',component:EditProductComponent},
  // Categoria
  {path:':slug/categoria',component:ViewCategoriaComponent},
  {path:':slug/categoria/add',component:AddCategoriaComponent},
  {path:':slug/categoria/edit/:id',component:EditCategoriaComponent},
  // Not Found
  {path:'notfound',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
