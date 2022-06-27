import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Meal } from 'src/health/shared/services/meals/meals.service';
import { Workout } from 'src/health/shared/services/workouts/workouts.service';


@Component({
    selector: 'schedule-assign',
    styleUrls: ['schedule-assign.component.scss'],
    templateUrl: 'schedule-assign.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleAssignComponent {

    private selected: string[] = [];

    @Input()
    section: any;
  
    @Input()
    list: Meal[] | Workout[];
  
    @Output()
    update = new EventEmitter<any>();
  
    @Output()
    cancel = new EventEmitter<any>();
  
    ngOnInit() {
      this.selected = [...this.section.assigned];
    }
  
    toggleItem(name: string) {
      if (this.exists(name)) {
        this.selected = this.selected.filter(item => item !== name);
      } else {
        this.selected = [...this.selected, name];
      }
    }
  
    getRoute(name: string) {
      return [`../${name}/new`];
    }
  
    exists(name: string) {
      return !!~this.selected.indexOf(name);
    }
  
    updateAssign() {
      this.update.emit({
        [this.section.type]: this.selected
      });
    }
  
    cancelAssign() {
      this.cancel.emit();
    }

}