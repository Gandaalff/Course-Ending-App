import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';



export const ROUTES: Routes = [
        
        {
        path: 'login',
        loadChildren: () => import ('./login/login.module').then(mod => mod.LoginModule)
        },

        {
        path: 'register',
        loadChildren: () => import ('./register/register.module').then(mod => mod.RegisterModule)
        }
       
    ] 

    

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        LoginModule,
        RegisterModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFirestoreModule ,
        SharedModule.forRoot()
    ]
})
export class AuthModule {}

