import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ScheduleItem, ScheduleService } from 'src/health/shared/services/schedule/schedule.service';
import { Store } from 'store';
@Component({
    selector: 'schedule',
    styleUrls: ['schedule.component.scss'],
    templateUrl: 'schedule.component.html'
})
export class ScheduleComponent implements OnInit, OnDestroy {

    date$: Observable<Date>;
    subscriptions: Subscription[] = [];
    schedule$: Observable<ScheduleItem>

    constructor(
        private scheduleService: ScheduleService,
        private store: Store
    ) {}

    changeDate(date : Date) {
        this.scheduleService.updateDate(date);
    }

    ngOnInit(): void {
        this.date$ = this.store.select('date'),
        this.schedule$ = this.store.select('schedule')

        this.subscriptions = [
            this.scheduleService.schedule$.subscribe(),
            this.scheduleService.selected$.subscribe()
        ];
    }
    
    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe())
    }

    changeSection(event: any) {
        console.log(event)
        this.scheduleService.selectSection(event)
    }
    
}
