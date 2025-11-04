import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Participation } from "../models/Participation";
import {Olympic} from "../models/Olympic";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private _olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this._olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this._olympics$.next(null);
        return caught;
      })
    );
  }

  get olympics() {
    return this._olympics$.asObservable();
  }

  public getNumberOfGames(): number {
    const gameYears : number[] = [];
    this._olympics$.value.forEach(
      (olympic: Olympic) => olympic.participations.forEach(
        (participation: Participation) => gameYears.push(participation.year)
      )
    )
    return new Set(gameYears).size;
  }

  public getCountries(): string[] {
    return this._olympics$.value.map((olympic: Olympic) => olympic.country);
  }

  public getNumberOfCountries(): number {
    return this._olympics$.value.length;
  }

  public getMedals(): number[] {
    return this._olympics$.value.map(
      (olympic: Olympic) => olympic.participations.reduce(
        (sum: number, participation: Participation) => sum + participation.medalsCount, 0)
    )
  }

  public countryIdByIndex(index: number) {
    return this._olympics$.value[index].id;
  }


}
