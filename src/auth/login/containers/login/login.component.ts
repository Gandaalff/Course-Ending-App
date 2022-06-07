import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Router } from '@angular/router';




@Component({
    selector: 'login',
    styleUrls: ['login.component.css'],
    templateUrl: 'login.component.html'
})


export class LoginComponent {

    error: string;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    async loginUser(event: FormGroup){
        const {email, password} = event.value;
        try{
        await this.authService.loginUser(email,password);
        this.router.navigate(['/']);
        } catch (err){  
            this.error = err.message;
        }
    }
}