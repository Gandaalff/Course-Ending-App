import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WorkoutService } from 'src/health/shared/services/workouts/workouts.service';
import { Workout } from 'src/health/shared/services/workouts/workouts.service';

@Component({
    selector: 'workout',
    styleUrls: ['workout.component.scss'],
    templateUrl: 'workout.component.html'
})
export class WorkoutComponent implements OnInit {
    
    workout$: Observable<Workout>;           
    subscription: Subscription

    constructor(
        private workoutService : WorkoutService,
        private Router : Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(){
    this.workout$ = this.route.params
        .pipe(switchMap((param) => {
            console.log('param.id', param.id);
            return this.workoutService.getWorkout(param.id)
        }))
    }

    async addWorkout(event: Workout, ) {
        await this.workoutService.addWorkout(event);
        this.backToWorkout()
    }

    backToWorkout(){
        this.Router.navigate(['workout']);
    }

    async updateMeal(event: Workout){
        const key = this.route.snapshot.params.id;
        await this.workoutService.updateWorkout(key, event);
        this.backToWorkout
    }

    async removeWorkout(event: Workout){
        const key = this.route.snapshot.params.id;
        await this.workoutService.deleteWorkout(key);
        this.backToWorkout
    }






}

