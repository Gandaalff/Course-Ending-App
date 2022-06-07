import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';


import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        AuthFormComponent
    ],
  
    exports: [
        AuthFormComponent
    ]
})

export class SharedModule {}