import {Component, inject, OnInit} from '@angular/core';
import {map, Observable, take} from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  protected olympicService = inject(OlympicService);
  protected isLoading$ !: Observable<boolean>;

  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();
    this.isLoading$ = this.olympicService.olympics.pipe(
      map(olympics => olympics.length === 0)
    );
  }
}
