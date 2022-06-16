import { Component } from '@angular/core';
import { Meal } from 'src/health/shared/services/meals/meals.service';

@Component({
    selector: 'meal',
    styleUrls: ['meal.component.scss'],
    templateUrl: 'meal.component.html'
})

export class MealComponent {
    constructor() {}
    addMeal(event: Meal) {
        console.log(event);
    }
}