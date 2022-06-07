import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'register',
    styleUrls: ['register.component.css'],
    templateUrl: 'register.component.html'
})


export class RegisterComponent {
    constructor() {}

    registerUser(event: FormGroup){
        console.log(event.value)
    }
}