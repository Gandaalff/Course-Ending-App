import { Component, ChangeDetectionStrategy, OnInit, Output,EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators,  } from '@angular/forms';
import { stringify } from 'querystring';
import { Meal } from 'src/health/shared/services/meals/meals.service';



@Component({
    selector: 'meal-form',
    styleUrls: ['meal-form.component.scss'],
    templateUrl: 'meal-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MealFormComponent implements OnChanges, OnInit {
    
    toggled = false;
    exists = false;

    @Input()
    meal: Meal

    @Output()
    create: EventEmitter<Meal> = new EventEmitter();

    @Output()
    update: EventEmitter<Meal> = new EventEmitter();

    @Output()
    remove: EventEmitter<Meal> = new EventEmitter();

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

    ngOnChanges(changes: SimpleChanges){
        console.log("zzzz",this.meal.name)
            console.log("zzzz",this.meal)
        if(this.meal && this.meal.$key ){
            console.log("zzzz",this.meal.$key)
            console.log("zzzz",this.meal)
            this.exists = true
            const value = this.meal;
            console.log('value', value)
            this.form.patchValue(value)

            this.emptyIngredients();

            if(value.ingredients) {
                for(const item of value.ingredients) {
                    this.ingredients.push(new FormControl(item))
                }
            }
        }
    }

    ngOnInit(): void {
        this.form= this.fb.group({
            name: ['', Validators.required],
            ingredients: this.fb.array(['']),
           
        })
    }

    emptyIngredients() {
        while(this.ingredients.controls.length){
            this.ingredients.removeAt(0)
        }
    }
    
    addIngredient() {
        this.ingredients.push(new FormControl(''))
    }

    createMeal() {
        if(this.form.valid) {
            this.create.emit(this.form.value)
        }
    }

    async updateMeal() {
        if(this.form.valid) {
            this.update.emit(this.form.value)
        }
    }

    removeMeal() {
        this.remove.emit(this.form.value)
    }

    removeIngredient(index: number) {
        this.ingredients.removeAt(index)
    }

    toggle(){
        this.toggled = !this.toggled
    }

}