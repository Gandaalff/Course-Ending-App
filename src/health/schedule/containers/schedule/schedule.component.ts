import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MealsComponent } from 'src/health/meals/containers/meals/meals.component';
import { Meal, MealsService } from 'src/health/shared/services/meals/meals.service';
import { ScheduleItem, ScheduleService } from 'src/health/shared/services/schedule/schedule.service';
import { Workout, WorkoutService } from 'src/health/shared/services/workouts/workouts.service';
import { WorkoutComponent } from 'src/health/workout/containers/workout/workout.component';
import { Store } from 'store';
@Component({
    selector: 'schedule',
    styleUrls: ['schedule.component.scss'],
    templateUrl: 'schedule.component.html'
})
export class ScheduleComponent implements OnInit, OnDestroy {

    open=false;

    date$: Observable<Date>;
    subscriptions: Subscription[] = [];
    schedule$: Observable<ScheduleItem>;
    selected$: Observable<any>;
    list$: Observable<Meal[] | Workout[]>;
    meals$: Observable<Meal[]>;
   

    constructor(
        private scheduleService: ScheduleService,
        private store: Store,
        private mealsService: MealsService,
        // private workout: WorkoutComponent,
        // private meals: MealsComponent

    ) {}

    changeDate(date : Date) {
        this.open = true
        this.scheduleService.updateDate(date);
    }

    ngOnInit(): void {
        this.date$ = this.store.select('date'),
        this.schedule$ = this.store.select('schedule'),
        this.selected$ = this.store.select('selected'),
        this.list$ = this.store.select('list'),
        
        // this.meals$ = this.store.select<Meal[]>('meals');
       
        

        this.subscriptions = [
            this.scheduleService.schedule$.subscribe(),
            this.scheduleService.selected$.subscribe(),
            this.scheduleService.list$.subscribe(),
            this.scheduleService.items$.subscribe(),
            // this.meals.meals$.subscribe(),       //Błąd
            // this.workout.workout$.subscribe() //// Błąd
        ];
    }
    
    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe())
    }

    changeSection(event: any) {
        console.log(event)
        this.scheduleService.selectSection(event)
    }

    assignItem(items: string[]) {
        this.scheduleService.updateItems(items);
        this.closeAsign();
    }

    

    closeAsign() {
        this.open = false
    }
    
}
