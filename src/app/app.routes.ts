import { Routes } from '@angular/router';
// import { AuthLayoutComponent } from './features/layout/auth-layout/auth-layout.component';
// import { MainLayoutComponent } from './features/layout/main-layout/main-layout.component';
import { authGuard } from './core/guard/auth/auth.guard';
import { checkTokenGuard } from './core/guard/checkToken/check-token.guard';


export const routes: Routes = [
    {path:'',loadComponent:()=>import('./features/layout/auth-layout/auth-layout.component').then(e=>e.AuthLayoutComponent),canActivate:[checkTokenGuard],children:[
        {path:'login',loadComponent:()=>import('./features/auth/login/login.component').then(e=>e.LoginComponent),title:'login'},
        {path:'signup',loadComponent:()=>import('./features/auth/register/register.component').then(e=>e.RegisterComponent),title:'signup'}
    ]},
    {path:'',loadComponent:()=>import('./features/layout/main-layout/main-layout.component').then(e=>e.MainLayoutComponent),children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',loadComponent:()=>import('./features/pages/home/home.component').then(e=>e.HomeComponent),title:'home'},
        {path:'productDetails/:id',loadComponent:()=>import('./features/pages/product-details/product-details.component').then(e=>e.ProductDetailsComponent),title:'product Details'},
        {path:'cart',loadComponent:()=>import('./features/pages/cart/cart.component').then(e=>e.CartComponent),canActivate:[authGuard],title:'cart'},
        {path:'products',loadComponent:()=>import('./features/pages/products/products.component').then(e=>e.ProductsComponent),title:'products'},
        {path:'brands',loadComponent:()=>import('./features/pages/brands/brands.component').then(e=>e.BrandsComponent),title:'brands'},
        {path:'categories',loadComponent:()=>import('./features/pages/categories/categories.component').then(e=>e.CategoriesComponent),title:'categories'},
        {path:'payment/:id',loadComponent:()=>import('./features/pages/paymentGateway/payment-gateway/payment-gateway.component').then(e=>e.PaymentGatewayComponent),title:'payment'},
        {path:'allOrders',loadComponent:()=>import('./features/pages/all-orders/all-orders/all-orders.component').then(e=>e.AllOrdersComponent),title:'allOrders'},
    ]},
    {path:'**',loadComponent:()=>import('./features/pages/not-found/not-found.component').then(e=>e.NotFoundComponent)}

];
