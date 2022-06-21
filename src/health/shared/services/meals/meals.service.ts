import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { Observable, tap } from 'rxjs';
import { AuthService, User } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'store';
import { of } from 'rxjs'
import { filter, map } from 'rxjs/operators';


export interface Meal{
   
    name:string,
    ingredients: string[];
    timestamp: number,
    $key: string,
    $exists: () => boolean
}

@Injectable()
export class MealsService {
    
    user: User;
    onAuthStateChanged: any;
    firebase: any;

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService,
        public afAuth: AngularFireAuth
    ) {}

    getMealsForUser(uuidUser: string): Observable<Meal> {
        return  this.db.list(`meals/${uuidUser}`).snapshotChanges().pipe(
                tap((next: any) => {
                    this.store.set('meals',next.map((meal:any) => ({ $key: meal.payload.key, ...meal.payload.val() as Meal })))
                })
                
        )
        
    }
    // getMealsForUser(uuidUser: string): Observable<Meal[]> {
    //     return this.db.list(`meals/${uuidUser}`).snapshotChanges()
    //     .pipe(map(next => {
    //      return next.map(meal => {
    //       const data = meal.payload.val() as Meal;
    //       const $key = meal.key;
    //       return { $key, ...data };
    //      });
    //     }));
    //    }




    async addMeal(meal: Meal){
        const user = await this.authService.user();
        console.log('aktaulny użytkownik',user)
        const newMeal= this.db.list(`meals/${user.uid}`);
        newMeal.push(meal)
        console.log("nowy posiłek",meal)

    }

    async removeMeal($key:string) {
        const user = this.authService.user();
        const removeMeal = this.db.list(`meals/${(await user).uid}`)
        removeMeal.remove($key)         
    }

    getMeal(key:string){
        if(!key) return of('pusta');
        return this.store.select<Meal[]>('meals')
                .pipe(
                  filter((meals: any) => {
                    return meals?.find((meal: Meal) => meal.$key === key);
                  })
                )
    }

    updateMeal(key: string, meal:Meal) {
        
        return this.db.object(`meals/${this.user.uid}/${key}`).update(meal)
    }

    deleteMeal(key: string) {
        return this.db.list(`meals/${this.user.uid}`).remove(key)
    }
    
}


