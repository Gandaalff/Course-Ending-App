import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';
import { SharedModule } from '../shared/shared.module';


export const ROUTES: Routes =[
    {path: 'login', component: LoginComponent}
]


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        SharedModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: []
})
export class LoginModule {}