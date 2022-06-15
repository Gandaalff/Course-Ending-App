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
    ) {}

    getMealsForUser(uuidUser: string): any {
      return this.db.list(`meals/${uuidUser}`).valueChanges().pipe(
              tap((next: any) => {
                this.store.set('meals',next);
              }))
    }

}
