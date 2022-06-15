import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Meal, MealsService } from 'src/health/shared/services/meals/meals.service';
import { Store } from 'store';


@Component({
    selector: 'meals',
    styleUrls: ['meals.component.scss'],
    templateUrl: 'meals.component.html'
})
export class MealsComponent implements OnInit, OnDestroy {

    meals$: Observable<Meal[]>
    subscription: Subscription

    constructor(
        private mealsService: MealsService,
        private store: Store
    ) {}

ngOnInit(){
    this.meals$ = this.store.select<Meal[]>('meals'),
    this.subscription = this.mealsService.meals$.subscribe()
}

ngOnDestroy(){
    this.subscription.unsubscribe()
}
}