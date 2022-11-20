import { EditFormResolver } from './admin/edit-form.resolver';
import { LoginGuard } from './login-form/login.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './login-form/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin/admin.guard';
import { ShowMoreComponent } from './show-more/show-more.component';
import { EditFormComponent } from './admin/edit-form/edit-form.component';


const appRoutes: Routes = [
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'list', component: ListComponent, canActivate: [AuthGuard]},
{ path: 'show-more/:id', component: ShowMoreComponent },
{path: 'login', component: LoginFormComponent, canActivate: [LoginGuard] },
{ path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
  { path: 'edit-form/:id', component: EditFormComponent, resolve : {
    items: EditFormResolver
  }}
]},
{ path: 'shoppingCart', component: ShoppingCartComponent },
{ path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    LoginFormComponent,
    ShoppingCartComponent,
    AdminComponent,
    ShowMoreComponent,
    EditFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
