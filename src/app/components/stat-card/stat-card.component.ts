import { Component, input } from '@angular/core';
import {Stat} from "../../core/models/Stat";

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [
  ],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})
export class StatCardComponent {
  stat = input.required<Stat>();
}
