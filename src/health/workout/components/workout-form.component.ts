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

    // get ingredients(){
    //     return this.form.get('ingredients') as FormArray
    // }

    get required() {
        return (
            this.form.get('name').hasError('required') &&
            this.form.get('name').touched
        )
    }

    constructor(
        private fb: FormBuilder
    ) {}

    ngOnChanges(changes: SimpleChanges){
        // console.log("zzzz",this.meal.name)
        //     console.log("zzzz",this.meal)
        // if(this.meal && this.meal.$key ){
        //     console.log("zzzz",this.meal.$key)
        //     console.log("zzzz",this.meal)
        //     this.exists = true
        //     const value = this.meal;
        //     console.log('value', value)
        //     this.form.patchValue(value)

        //     this.emptyIngredients();

        //     if(value.ingredients) {
        //         for(const item of value.ingredients) {
        //             this.ingredients.push(new FormControl(item))
        //         }
        //     }
        // }
    }

    ngOnInit(): void {
        this.form= this.fb.group({
            name: ['', Validators.required],
        })
    }

    // emptyIngredients() {
    //     while(this.ingredients.controls.length){
    //         this.ingredients.removeAt(0)
    //     }
    // }
    
    // addIngredient() {
    //     this.ingredients.push(new FormControl(''))
    // }

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

    // removeIngredient(index: number) {
    //     this.ingredients.removeAt(index)
    // }

    toggle(){
        this.toggled = !this.toggled
    }

}