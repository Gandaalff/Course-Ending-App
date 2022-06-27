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

    getMealsForUser(uuidUser: string): any {
        return  this.db.list(`meals/${uuidUser}`).snapshotChanges().pipe(
                tap((mealsFromDatebase: any) => {
                  this.store.set('meals',mealsFromDatebase.map((meal: any) => ({ $key: meal.key, ...meal.payload.val() })));
                }))
      }

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
        if(!key) return of({});
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
