import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {GetUnitsService} from "../../services/get-units.service";
import {ILocation} from "../../types/location.interface";

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})

export class FormsComponent implements OnInit{
  results:ILocation[] =[]
  filteredResults:ILocation[] =[]
  formGroup!:FormGroup
  constructor(private formBuilder: FormBuilder, private unitService: GetUnitsService) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      hour:'',
      showClosed:true
    })
    this.unitService.getAllUnites().subscribe(data=>{
      this.results = data.locations
      this.filteredResults = data.locations
    })
  }

  onSubmit():void{
    if(!this.formGroup.value.showClosed){
      this.filteredResults = this.results.filter(location =>location.opened == true)
    }else{
      this.filteredResults = this.results
    }
  }

  onClean():void{
    this.formGroup.reset();
  }
}
