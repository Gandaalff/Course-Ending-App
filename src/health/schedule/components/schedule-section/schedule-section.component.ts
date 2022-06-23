import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ScheduleItem } from 'src/health/shared/services/schedule/schedule.service';

@Component({
    selector: 'schedule-section',
    styleUrls: ['schedule-section.component.scss'],
    templateUrl: 'schedule-section.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleSectionComponent {
    @Input()
    name: string

    @Input()
    section: ScheduleItem

    @Output()
    select = new EventEmitter<any>()

    onSelect(type: string, assigned: string[] = []) {
        const data = this.section;
        this.select.emit({
            type,
            assigned,
            data
        })
    }
}