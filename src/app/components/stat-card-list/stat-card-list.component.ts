import {Component, input} from '@angular/core';
import { StatCardComponent } from "../stat-card/stat-card.component";
import {Stat} from "../../core/models/Stat";

@Component({
  selector: 'app-stat-card-list',
  standalone: true,
  imports: [
    StatCardComponent
  ],
  templateUrl: './stat-card-list.component.html',
  styleUrl: './stat-card-list.component.scss'
})
export class StatCardListComponent {
  statList = input.required<Stat[]>();
}
