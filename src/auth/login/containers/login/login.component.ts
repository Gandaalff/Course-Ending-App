import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'login',
    styleUrls: ['login.component.css'],
    templateUrl: 'login.component.html'
})


export class LoginComponent {
    constructor() {}

    loginUser(event: FormGroup){
        console.log(event.value)
    }
}