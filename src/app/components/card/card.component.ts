import {Component, Input} from '@angular/core';
import {ILocation} from "../../types/location.interface";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() card!: ILocation
}
