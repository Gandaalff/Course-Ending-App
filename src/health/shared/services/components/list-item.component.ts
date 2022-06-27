import { ChangeDetectionStrategy, Output, EventEmitter  } from '@angular/core';
import { Component, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Meal } from '../meals/meals.service';


@Component({
    selector: 'list-item',
    styleUrls: ['list-item.component.scss'],
    templateUrl: 'list-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent {
    itemsRef: AngularFireList<Meal>;
    items: Observable<Meal[]>;
    toggled = false;

    @Input()
    item: any;

    @Output()
    remove = new EventEmitter

    constructor() {
        // this.itemsRef = db.list('messages');
    // Use snapshotChanges().map() to store the key

    }

    toggle() {
        this.toggled = !this.toggled;
    }

    removeItem(){
        this.remove.emit(this.item)
    }

<<<<<<< HEAD
=======
    // getKey(){
    //     this.items = this.itemsRef.snapshotChanges().pipe(
    //         map(changes =>
    //           changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //         )

    //       );
    // }
>>>>>>> 65d1c2a77a1bf95c71ee86d629d9a1b719c874ac

    getRoute(item: any) {
        return [`../${item.ingredients ? 'meals' : 'workout'}`,item.$key];  //$KEY ZWRACA UNDEFINED
    }

}
