import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'store';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Workout, WorkoutService } from 'src/health/shared/services/workouts/workouts.service';

@Component({
    selector: 'workouts',
    styleUrls: ['workouts.component.scss'],
    templateUrl: 'workouts.component.html'
})
export class WorkoutsComponent implements OnInit, OnDestroy {

    workouts$: Observable<Workout[]>
    subscription: Subscription= new Subscription();
   

    constructor(
        private workoutService: WorkoutService,
        private authService: AuthService,
        private store: Store
    ) {}

async ngOnInit(){
    this.workouts$ = this.store.select<Workout[]>('workouts');

    const user = await this.authService.user();
    
    this.subscription.add(
        this.workoutService.getWorkoutsForUser(user.uid).subscribe()
    );

    
}

ngOnDestroy(){
    this.subscription.unsubscribe()
}

removeMeal(event: any) {
    this.workoutService.removeWorkout(event.$key)
    console.log('remove:', event)

}
}