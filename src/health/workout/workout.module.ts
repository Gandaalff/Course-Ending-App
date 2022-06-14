import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutComponent } from './containers/workout/workout.component';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES : Routes =[
    {path: '', component: WorkoutComponent}
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES)
        
    ],
    declarations: [
        WorkoutComponent
    ],
    providers: []
})
export class WorkoutModule {}