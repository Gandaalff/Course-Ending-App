import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Meal, MealsService } from 'src/health/shared/services/meals/meals.service';
import { Store } from 'store';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';

@Component({
    selector: 'meals',
    styleUrls: ['meals.component.scss'],
    templateUrl: 'meals.component.html'
})
export class MealsComponent implements OnInit, OnDestroy {

    meals$: Observable<Meal[]>
    subscription: Subscription= new Subscription();
   

    constructor(
        private mealsService: MealsService,
        private authService: AuthService,
        private store: Store
    ) {}

async ngOnInit(){
    this.meals$ = this.store.select<Meal[]>('meals');

    const user = await this.authService.user();
    
    this.subscription.add(
        this.mealsService.getMealsForUser(user.uid).subscribe()
    );

    
}

ngOnDestroy(){
    this.subscription.unsubscribe()
}

removeMeal(event: any) {
    this.mealsService.removeMeal(event.$key)
    console.log('remove:', event)

}
}