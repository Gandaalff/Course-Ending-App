import { Component, ChangeDetectionStrategy, OnInit, Output,EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators,  } from '@angular/forms';
import { Workout } from 'src/health/shared/services/workouts/workouts.service';



@Component({
    selector: 'workout-form',
    styleUrls: ['workout-form.component.scss'],
    templateUrl: 'workout-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class WorkoutFormComponent implements OnChanges, OnInit {
    
    toggled = false;
    exists = false;

    @Input()
    workout: Workout

    @Output()
    create: EventEmitter<Workout> = new EventEmitter();

    @Output()
    update: EventEmitter<Workout> = new EventEmitter();

    @Output()
    remove: EventEmitter<Workout> = new EventEmitter();

    form!: FormGroup

    get required() {
        return (
            this.form.get('name').hasError('required') &&
            this.form.get('name').touched
        )
    }

    constructor(
        private fb: FormBuilder
    ) {}

    get placeholder() {
        return `e.g ${this.form.get('type').value === 'strength' ? 'Benchpress' : 'Treadmill'}`
    }

    ngOnChanges(changes: SimpleChanges){
        
        if(this.workout && this.workout.name ){
            this.exists = true
            const value = this.workout;
            console.log('value', value)
            this.form.patchValue(value)
        }
    }

    ngOnInit(): void {
        this.form= this.fb.group({
            name: ['', Validators.required],
            type: 'strength',
            strength: this.fb.group({
                reps: 0,
                sets: 0,
                weight: 0
            }),
            endurance: this.fb.group({
                distance: 0,
                duration: 0,
            })
        });
    }

    createWorkout() {
        if(this.form.valid) {
            this.create.emit(this.form.value)
        }
    }

    async updateWorkout() {
        if(this.form.valid) {
            this.update.emit(this.form.value)
        }
    }

    removeWorkout() {
        this.remove.emit(this.form.value)
    }

    toggle(){
        this.toggled = !this.toggled
    }

}