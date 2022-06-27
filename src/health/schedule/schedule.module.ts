import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleComponent } from './containers/schedule/schedule.component';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleCalenderComponent } from './components/schedule-calender/schedule-calender.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';
import { ScheduleSectionComponent } from './components/schedule-section/schedule-section.component';
import { SharedModule } from '../shared/shared.module';
import { ScheduleAssignComponent } from './components/schedule-assign/schedule-assign.component';

export const ROUTES : Routes =[
    {path: '', component: ScheduleComponent}
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule
        
    ],
    declarations: [
        ScheduleComponent,
        ScheduleCalenderComponent,
        ScheduleDaysComponent,
        ScheduleControlsComponent,
        ScheduleSectionComponent,
        ScheduleAssignComponent
    ],
    providers: []
})
export class ScheduleModule {}