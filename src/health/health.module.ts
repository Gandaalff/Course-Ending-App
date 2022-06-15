import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth/shared/auth.guard.ts/auth.guard';
import { SharedModule } from './shared/shared.module';
export const ROUTES : Routes =[
{
    path: 'schedule',
    canActivate:[AuthGuard],
    loadChildren: () => import ('./schedule/schedule.module').then(mod => mod.ScheduleModule)
},
{
    path: 'meals',
    canActivate:[AuthGuard],
    loadChildren: () => import ('./meals/meals.module').then(mod => mod.MealsModule)
},
{
    path: 'workout',
    canActivate:[AuthGuard],
    loadChildren: () => import ('./workout/workout.module').then(mod => mod.WorkoutModule)
},
]


@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        SharedModule.forRoot()
    ],
    declarations: [],
    providers: []
})
export class HealthModule {}