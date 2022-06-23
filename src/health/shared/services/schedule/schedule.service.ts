import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe, Subject } from 'rxjs';
import { Store } from 'store';
import { tap } from 'rxjs';
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';
import { map } from 'rxjs/operators'
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService, User } from 'src/auth/shared/services/auth/auth.service';
import { switchMap } from 'rxjs';
import { orderByChild, query } from 'firebase/database';

export interface ScheduleItem {
    meals: Meal[],
    workouts: Workout[],
    section: string,
    timestamp: number,
    $key?: string
}

export interface ScheduleList {
    morning?: ScheduleItem,
    lunch?: ScheduleItem,
    evening?: ScheduleItem,
    snacks?: ScheduleItem,
    [key: string] : any
}

@Injectable()
export class ScheduleService {


    user: User
    private date$ = new BehaviorSubject(new Date());
    private section$ = new Subject()

    selected$ = this.section$
        .pipe(
            tap((next: any)=> this.store.set('date',next))
        );

    schedule$: Observable<ScheduleItem[]> = this.date$
    .pipe(tap((next : any) => this.store.set('date', next)),
        map((day:any) => {
            const startAt=(
                new Date(day.getFullYear(), day.getMonth(), day.getDate())
            ).getTime();

            const endAt=(
                new Date(day.getFullYear(), day.getMonth(), day.getDate())
            ).getTime() -1;

            return {startAt, endAt}

        }),
        // switchMap(({startAt, endAt} : any) => {
        //     this.getSchedule(startAt, endAt)
        // }),
        map((data:any) => {
            const mapped: ScheduleList = {};

            for(const prop of data) {
                if(!mapped[prop.section]) {
                    mapped[prop.section] = prop;
                }
            }
            return mapped
        }),
        tap((next : any) => this.store.set('schedule', next))
    )

    // uid: any;
    
    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService : AuthService
    ) {}

    // async getUid(){
    //     const user = await this.authService.user();
    //     return this.uid = this.user.uid
    // }


    updateDate(date: Date) {
        this.date$.next(date);
    }

    // private getSchedule(startAt: any ,endAt: any) {
        
    //     return this.db.list(`schedule/${this.uid}`, {
    //       query: {
    //         orderByChild: 'timestamp',
    //         startAt,
    //         endAt
    //         }
    //     });
    //   }


    selectSection(event: any) {
        this.section$.next(event)
    }

}