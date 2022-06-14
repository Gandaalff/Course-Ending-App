import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


export const ROUTES : Routes =[
{
    path: 'schedule',
    loadChildren: () => import ('./schedule/schedule.module').then(mod => mod.ScheduleModule)
},
{
    path: 'meals',
    loadChildren: () => import ('./meals/meals.module').then(mod => mod.MealsModule)
},
{
    path: 'workout',
    loadChildren: () => import ('./workout/workout.module').then(mod => mod.WorkoutModule)
},
]


@NgModule({
    imports: [
        RouterModule.forChild(ROUTES)
    ],
    declarations: [],
    providers: []
})
export class HealthModule {}