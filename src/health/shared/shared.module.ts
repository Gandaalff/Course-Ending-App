import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import{MealsService} from './services/meals/meals.service'
import { ListItemComponent } from './services/components/list-item.component';
import { WorkoutService } from './services/workouts/workouts.service';
@NgModule({
    imports: [
        AngularFireDatabaseModule,
        RouterModule,
        CommonModule

    ],
    declarations: [
        ListItemComponent
    ],
    exports: [
        ListItemComponent
    ]
   
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<any>{
        return {
            ngModule: SharedModule,
            providers: [
                MealsService,
                WorkoutService
            ]
        }
    }
}