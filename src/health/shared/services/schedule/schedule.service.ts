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
import { withLatestFrom } from 'rxjs/operators';
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
    private section$ = new Subject();
    private itemList$ = new Subject();

    items$ = this.itemList$.pipe(withLatestFrom(this.section$),
                map(([items,section]: any[])=> {
                    
                    const id = section.data.$key;

                    const defaults: ScheduleItem= {
                        workouts: null,
                        meals: null,
                        section: section.section,
                        timestamp: new Date(section.day).getTime()
                    };

                    const payload = {
                        ...(id ? section.data: defaults),
                        ...items
                    };

                    if(id) {
                        return this.updateSection(id,payload)
                    } else {
                        return this.createSection(payload)
                    }

    }))

    selected$ = this.section$
        .pipe(
            map((value: any) => this.store.value[value.type]),
            tap((next: any)=> this.store.set('list',next))
        );


    list$ =  this.section$
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
        switchMap(({startAt, endAt} : any) => {
            return this.getSchedule(startAt, endAt);
        }),
        
        map((data:any) => {
            const mapped: ScheduleList = {};
            console.log("dane", data)
            for(const prop in data) {
                if(!mapped[prop]) {
                    mapped[prop] = prop;
                }
            }
            console.log("mapped", mapped)
            return mapped
        }),
        tap((next : any) => this.store.set('schedule', next))
    )
    
    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService : AuthService
    ) {}

    async getUid(){
        const user = await this.authService.user();
        return user.uid
    }

    updateItems(items: string[]) {
        this.itemList$.next(items)
    }

    updateDate(date: Date) {
        this.date$.next(date);
    }

    private async createSection(payload: ScheduleItem) {
        const uid = await this.getUid();
        return this.db.list(`schedule/${uid}`).push(payload) 
    }

    private async updateSection(key: string, payload: ScheduleItem) {
        const uid = await this.getUid();
        return this.db.object(`schedule/${uid}/${key}`).update(payload);
    }

    private async getSchedule(startAt: number ,endAt: number) {
        const uid = await this.getUid();
        return this.db.list(`schedule/${uid}`, ref => ref.orderByChild('timestamp').startAt(startAt).endAt(endAt)); {
        };
      }


    selectSection(event: any) {
        this.section$.next(event)
    }

}