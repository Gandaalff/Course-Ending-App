import { Component, ChangeDetectionStrategy, OnInit, Output,EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators,  } from '@angular/forms';
import { stringify } from 'querystring';
import { Meal } from 'src/health/shared/services/meals/meals.service';



@Component({
    selector: 'meal-form',
    styleUrls: ['meal-form.component.scss'],
    templateUrl: 'meal-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MealFormComponent implements OnInit {
    

    @Output()
    create: EventEmitter<Meal> = new EventEmitter();

    form!: FormGroup

    get ingredients(){
        return this.form.get('ingredients') as FormArray
    }

    get required() {
        return (
            this.form.get('name').hasError('required') &&
            this.form.get('name').touched
        )
    }

    constructor(
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.form= this.fb.group({
            name: ['', Validators.required],
            ingredients: this.fb.array(['']),
           
        })
    }
    
    addIngredient(){
        this.ingredients.push(new FormControl(''))
    }

    createMeal(){
        if(this.form.valid) {
            this.create.emit(this.form.value)
        }
    }

    removeIngredient(index: number) {
        this.ingredients.removeAt(index)
    }

}