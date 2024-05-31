import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AddProductComponent } from './components/dashboard/product/add-product/add-product.component';
import { AddCategoriaComponent } from './components/dashboard/categoria/add-categoria/add-categoria.component';
import { ViewCategoriaComponent } from './components/dashboard/categoria/view-categoria/view-categoria.component';
import { EditCategoriaComponent } from './components/dashboard/categoria/edit-categoria/edit-categoria.component';
import { ViewProductComponent } from './components/dashboard/product/view-product/view-product.component';
import { EditProductComponent } from './components/dashboard/product/edit-product/edit-product.component';
import { ViewDashboardComponent } from './components/dashboard/view-dashboard/view-dashboard.component';
import { HeaderDashboardComponent } from './components/dashboard/header-dashboard/header-dashboard.component';
import { VerifyComponent } from './components/verify/verify.component';
import { SuccessComponent } from './components/message/success/success.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ImageuploadComponent } from './components/imageupload/imageupload.component';
import { ImageuploadDirective } from './directives/imageupload.directive';
import { ProgressComponent } from './components/progress/progress.component';
import { BoxmessageComponent } from './components/message/boxmessage/boxmessage.component';
import { CirleLoaderComponent } from './components/loader/cirle-loader/cirle-loader.component';
import { ButtonLoaderComponent } from './components/loader/button-loader/button-loader.component';
import { ImgUploadAddComponent } from './components/upload/product/img-upload-add/img-upload-add.component';
import { ImgUploadEditComponent } from './components/upload/product/img-upload-edit/img-upload-edit.component';
import { LocalImageComponent } from './components/upload/visualizador/image/local-image/local-image.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgotPasswordComponent,
    AddProductComponent,
    AddCategoriaComponent,
    ViewCategoriaComponent,
    EditCategoriaComponent,
    ViewProductComponent,
    EditProductComponent,
    ViewDashboardComponent,
    HeaderDashboardComponent,
    VerifyComponent,
    SuccessComponent,
    PagenotfoundComponent,
    ImageuploadComponent,
    ImageuploadDirective,
    ProgressComponent,
    BoxmessageComponent,
    CirleLoaderComponent,
    ButtonLoaderComponent,
    ImgUploadAddComponent,
    ImgUploadEditComponent,
    LocalImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
