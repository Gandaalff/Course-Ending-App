import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { Observable, tap } from 'rxjs';
import { AuthService, User } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'store';
import { of } from 'rxjs'
import { filter, map } from 'rxjs/operators';


export interface Workout{
   
    name:string,
    type: string,
    sterngth: any,
    endurance: any,
    timestamp: number,
    $key: string,
    $exists: () => boolean
}

@Injectable()
export class WorkoutService {
    
    user: User;
    onAuthStateChanged: any;
    firebase: any;
    workouts$:Observable<Workout[]>

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService,
        public afAuth: AngularFireAuth
    ) {}

    getWorkoutsForUser(uuidUser: string): any {
        return  this.db.list(`workouts/${uuidUser}`).snapshotChanges().pipe(
                tap((next: any) => {
                    this.store.set('workouts',next.map((workout: any) => ({ $key: workout.key, ...workout.payload.val() })))
                })
                
        )
        
    }

    async addWorkout(workout: Workout){
        const user = await this.authService.user();
        const newWorkout= this.db.list(`workouts/${user.uid}`);
        newWorkout.push(workout)
    }

    async removeWorkout($key:string) {
        const user = this.authService.user();
        const removeMeal = this.db.list(`workouts/${(await user).uid}`)
        removeMeal.remove($key)         
    }

    getWorkout(key:string){
        if(!key) return of({});
        return this.store.select<Workout[]>('workouts')
                .pipe(
                  filter((workout: any) => {
                    return workout?.find((workout: Workout) => workout.$key === key);
                  })
                )
    }

    updateWorkout(key: string, workout:Workout) {
        
        return this.db.object(`workout/${this.user.uid}/${key}`).update(workout)
    }

    deleteWorkout(key: string) {
        return this.db.list(`workout/${this.user.uid}`).remove(key)
    }
    
}

