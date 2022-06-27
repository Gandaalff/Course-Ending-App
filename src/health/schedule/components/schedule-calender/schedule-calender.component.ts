import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ScheduleItem, ScheduleList } from 'src/health/shared/services/schedule/schedule.service';

@Component({
    selector: 'schedule-calender',
    styleUrls: ['schedule-calender.component.scss'],
    templateUrl: 'schedule-calender.component.html'
})
export class ScheduleCalenderComponent implements OnChanges {

    selectedDay: Date;
    selectedDayIndex: number;
    selectedWeek: Date

    sections =[
        { key : 'morning', name: 'Morning'},
        { key : 'lunch', name: 'Lunch'},
        { key : 'evening', name: 'Evening'},
        { key : 'morsnacksning', name: 'Snacks and Drinks'},
    ]

    @Input()
    set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
  }


    @Input()
    items: ScheduleList

    @Output()
    change = new EventEmitter<Date>()

    @Output()
    select = new EventEmitter<any>()

    constructor() {}

    ngOnChanges() {
        this.selectedDayIndex = this.getToday(this.selectedDay)
        this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay))
    }

    getSection(name : string) : ScheduleItem {
        console.log('itemy', this.items)
        return this.items && this.items[name] || {};
    }

    selectSection({type, assigned, data}: any, section: string) {
        const day = this.selectedDay;
        this.select.emit({
            type,
            assigned,
            section,
            day,
            data
        });
    }


    selectDay(index: number) {
        const selectedDay = new Date(this.selectedWeek);
        selectedDay.setDate(selectedDay.getDate() + index);
        this.change.emit(selectedDay);
      }


    onChange(weekOffset: number) {
        const startOfWeek = this.getStartOfWeek(new Date());
        const startDate = (
            new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
        );
        startDate.setDate(startDate.getDate() + (weekOffset * 7));
        this.change.emit(startDate)
    }

    private getToday(date: Date) {
        let today = date.getDay() -1;
        if(today < 0) {
            today = 6;
        }
        return today;
    }


    private getStartOfWeek(date: Date) {
        const day = date.getDay();
        const diff = date.getDate() - day +(day === 0 ? -6 : 1)
        return new Date(date.setDate(diff))
    }

}