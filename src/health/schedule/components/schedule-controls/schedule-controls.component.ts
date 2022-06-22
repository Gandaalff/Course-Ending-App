import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'schedule-controls',
    styleUrls: ['schedule-controls.component.scss'],
    templateUrl: 'schedule-controls.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleControlsComponent {

    offset = 0;

   @Input()
   selected: Date;

   @Output()
   move = new EventEmitter<number>();

    moveDate(offset: number) {
        this.offset = offset;
        this.move.emit(offset);
    }
}