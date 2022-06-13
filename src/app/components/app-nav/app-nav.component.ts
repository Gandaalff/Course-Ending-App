import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-headre',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['app-nav.component.scss'],
    templateUrl: 'app-nav.component.html'
})
export class AppNavComponent {
    constructor() {}
}