import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { Form, FormArray, FormGroup, FormBuilder, FormControl, Validators,  } from '@angular/forms';
@Component({
    selector: 'meal-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['meal-form.component.scss'],
    templateUrl: 'meal-form.component.html'
})
export class MealFormComponent implements OnInit {
    form!: FormGroup
    
   
    constructor(
        private fb: FormBuilder
    ) {}
    

    ngOnInit(): void {
        this.form= this.fb.group({
            name: ['', Validators.required],
            ingrediens: this.fb.array([''])
        })

        
    }
    
    get ingredients(){
        return this.form.get('ingredients') as FormArray
    }

    addIngredient(){
        this.ingredients.push(new FormControl('xyz'))
    }

    createMeal(){
        console.log(this.form.value)
    }

    removeIngredient(index: number) {
        this.ingredients.removeAt(index)
    }
}