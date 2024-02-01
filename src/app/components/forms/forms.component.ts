import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {GetUnitsService} from "../../services/get-units.service";
import {ILocation} from "../../types/location.interface";
import {FilterUnitsService} from "../../services/filter-units.service";


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
  constructor(private formBuilder: FormBuilder,
              private unitService: GetUnitsService,
              private filterService:FilterUnitsService) {
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
  const {showClosed,hour} = this.formGroup.value
  this.filteredResults=this.filterService.filter(this.results, showClosed,hour)
  }

  onClean():void{
    this.formGroup.reset();
  }
}
