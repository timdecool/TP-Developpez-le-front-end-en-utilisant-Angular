import {Component, inject} from '@angular/core';
import {ChartConfiguration, ChartData} from "chart.js";
import {Subject, takeUntil} from "rxjs";
import {tap} from "rxjs/operators";
import {Stat} from "../../core/models/Stat";
import {ActivatedRoute, Router} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";
import {PageHeaderComponent} from "../../components/page-header/page-header.component";
import {StatCardListComponent} from "../../components/stat-card-list/stat-card-list.component";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  olympicService = inject(OlympicService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  private destroy$ !: Subject<boolean>;

  private countryId!: number;
  protected countryName!: string;
  protected chartData!: ChartData<'line'>;
  protected statList!: Stat[];

  ngOnInit() {
    this.destroy$ = new Subject<boolean>()
    this.olympicService.olympics.pipe(
      takeUntil(this.destroy$),
      tap(() => {
        this.getCountryData();
        this.countryName = this.olympicService.getCountryNameByCountry(this.countryId);
        this.updateChart();
        this.updateStats();
      })
    ).subscribe();
    this.getCountryData();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  getCountryData() {
    const countryData = this.olympicService.getCountryById(Number(this.route.snapshot.paramMap.get('id')));
    if(countryData === undefined) this.router.navigate(['/notfound']);
    else {
      this.countryId = countryData.id;
      this.countryName = countryData.country;
    }
  }

  private updateChart() {
    this.chartData = {
      labels: this.olympicService.getParticipationYearsByCountry(this.countryId),
      datasets: [
        {
          label: "Medals won",
          data: this.olympicService.getNumberOfMedalsByGameByCountry(this.countryId),
          fill: false
        }
      ]
    }
  };

  private updateStats() {
    this.statList = [
      {
        "label": 'Number of entries',
        "value": this.olympicService.getNumberOfParticipationsByCountry(this.countryId)
      },
      {
        "label": 'Total number of medals',
        "value": this.olympicService.getNumberOfMedalsByCountry(this.countryId)
      },
      {
        "label": 'Total number of athletes',
        "value": this.olympicService.getNumberOfAthletesByCountry(this.countryId)
      }
    ]
  };

  protected lineChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      }
    },
  }


}
