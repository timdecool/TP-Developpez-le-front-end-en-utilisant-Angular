import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {ChartConfiguration, ChartData, ChartEvent} from "chart.js";
import {Router} from "@angular/router";
import {Stat} from "../../core/models/Stat";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private olympicService = inject(OlympicService);
  private router = inject(Router);

  private destroy$ !: Subject<boolean>;

  protected statList!: Stat[];
  protected chartData!: ChartData<'pie'>;

  public chartClicked({event, active}: { event: ChartEvent; active: any[]; }): void {
    this.router.navigate(
      [
        '/details',
        this.olympicService.countryIdByIndex(active[0].index)
      ]
    );
  }

  protected pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      }
    },
    onClick: (event, active) => this.chartClicked({event, active})
  }

  ngOnInit() {
    this.destroy$ = new Subject<boolean>();
    this.olympicService.olympics.
    pipe(
      takeUntil(this.destroy$),
      tap(() => {
        this.updateStats();
        this.updateChart();
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  private updateStats(): void {
    this.statList = [
      {
        "label": "Number of Olympic games",
        "value": this.olympicService.getNumberOfGames()
      },
      {
        "label": "Number of countries",
        "value": this.olympicService.getNumberOfCountries()
      }
    ];
  }

  private updateChart(): void {
    this.chartData = {
      labels: this.olympicService.getCountries(),
      datasets: [
        {
          data: this.olympicService.getMedals(),
          label: 'Medals'
        }
      ]
    }
  }
}
