import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {FormsComponent} from "./components/forms/forms.component";
import {BehaviorSubject} from "rxjs";
import {CardListComponent} from "./components/card-list/card-list.component";
import {CommonModule} from "@angular/common";
import {ILocation} from "./types/location.interface";
import {GetUnitsService} from "./services/get-units.service";
import {LegendComponent} from "./components/legend/legend.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FormsComponent, CardListComponent, CommonModule, LegendComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showList = new BehaviorSubject(false)
  unitsList: ILocation[] = []

  constructor(private unitService:GetUnitsService) {

  }
  onSubmit(){
    this.unitsList = this.unitService.getFilterUnites()
    this.showList.next(true)
  }
}
