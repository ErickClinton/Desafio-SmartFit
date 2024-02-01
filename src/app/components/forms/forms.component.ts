import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  @Output() submitEvent = new EventEmitter();
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
    this.unitService.getAllUnits().subscribe(data=>{
      this.results = data
      this.filteredResults = data
    })
  }

  onSubmit():void{
    const {showClosed,hour} = this.formGroup.value
    this.filteredResults=this.filterService.filter(this.results, showClosed,hour)
    this.unitService.setFilteredUnits(this.filteredResults)

    this.submitEvent.emit();
  }

  onClean():void{
    this.formGroup.reset();
  }
}
