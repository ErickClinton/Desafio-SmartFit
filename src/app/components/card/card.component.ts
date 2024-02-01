import {Component, Input} from '@angular/core';
import {ILocation} from "../../types/location.interface";
import {NgClass, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgClass,
    NgOptimizedImage
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() card!: ILocation
}
