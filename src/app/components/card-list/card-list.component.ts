import {Component, Input, OnInit} from '@angular/core';
import {GetUnitsService} from "../../services/get-units.service";
import {ILocation} from "../../types/location.interface";
import {CardComponent} from "../card/card.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf,
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent implements OnInit{
  @Input() unitsList:ILocation[]=[]


  ngOnInit() {
    console.log(this.unitsList)

  }
}
