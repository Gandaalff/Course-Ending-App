import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/auth/shared/services/auth/auth.service';

@Component({
    selector: 'app-headre',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['app-header.component.scss'],
    templateUrl: 'app-header.component.html'
})
export class AppHeaderComponent {

    @Input()
    user: User


    @Output()

    logout = new EventEmitter<any>();

    logoutUser(){
        this.logout.emit();
    }


    constructor() {}
}