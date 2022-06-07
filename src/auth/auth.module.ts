import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';

export const ROUTES: Routes = [{
    path: 'auth',
    children:[
        {
        path: '', pathMatch: 'full', redirectTo: 'login' 
        },
        
        {
        path: 'login',
        loadChildren: () => import ('./login/login.module').then(mod => mod.LoginModule)
        },

        {
        path: 'register',
        loadChildren: () => import ('./register/register.module').then(mod => mod.RegisterModule)
        }
    ]    ,
}];
    

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        LoginModule,
        RegisterModule
    ],
})
export class AuthModule {}




// {
//     path: 'auth',
//     children:[
//         {path: '', pathMatch: 'full', redirectTo: 'login' },
//         {path: 'login',
//         loadChildren: () => import('./login/login.module').then(x => x.LoginModule)
//     },
//         {path: 'refister',
//         loadChildren: './register/register.module#LoginModule'},
//     ]
// }