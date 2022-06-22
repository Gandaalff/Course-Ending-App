import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Meal, MealsService } from 'src/health/shared/services/meals/meals.service';
import { switchMap } from 'rxjs/operators';


@Component({
    selector: 'meal',
    styleUrls: ['meal.component.scss'],
    templateUrl: 'meal.component.html'
})

export class MealComponent implements OnInit, OnDestroy {

    meal$: Observable<Meal>;             //Zamiast Any ma być Meal
    subscription: Subscription


    constructor(
        private mealsService : MealsService,
        private Router : Router,
        private route: ActivatedRoute
    ) {}


    ngOnInit(){
    this.meal$ = this.route.params
        .pipe(switchMap((param) => {
            console.log('param.id', param.id);
            return this.mealsService.getMeal(param.id)
        }))
    }

    ngOnDestroy(): void {
    //     this.subscription.unsubscribe()

    }
    async addMeal(event: Meal, ) {
        await this.mealsService.addMeal(event);
        this.backToMeals()
    }

    backToMeals(){
        this.Router.navigate(['meals']);
    }

    async updateMeal(event: Meal){
        const key = this.route.snapshot.params.id;
        await this.mealsService.updateMeal(key, event);
        this.backToMeals
    }

    async removeMeal(event: Meal){
        const key = this.route.snapshot.params.id;
        await this.mealsService.deleteMeal(key);
        this.backToMeals
    }






}


