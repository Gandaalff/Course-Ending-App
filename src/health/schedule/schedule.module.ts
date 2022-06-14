import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleComponent } from './containers/schedule/schedule.component';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES : Routes =[
    {path: '', component: ScheduleComponent}
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES)
        
    ],
    declarations: [
        ScheduleComponent
    ],
    providers: []
})
export class ScheduleModule {}