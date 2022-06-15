import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, pipe, tap } from 'rxjs';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'store';

export interface Meal{
    name:string,
    ingredients: string[];
    timestamp: number,
    $key: string,
    $exists: () => boolean
}

@Injectable()
export class MealsService {
    meals$: any =[]

   

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService
    ) {
        this.meals$ = this.db.list(`meals/${this.uid}`).valueChanges().pipe(tap((next: any) => this.store.set('meals',next)))
    }


    async uid() {
        const user = await this.authService.user;
        return user.uid;
        
       }
}