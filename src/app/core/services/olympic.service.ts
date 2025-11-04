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
    this._olympics$.value?.forEach(
      (olympic: Olympic) => olympic.participations.forEach(
        (participation: Participation) => gameYears.push(participation.year)
      )
    )
    return new Set(gameYears).size;
  }

  public getCountries(): string[] {
    return this._olympics$.value?.map((olympic: Olympic) => olympic.country);
  }

  public getNumberOfCountries(): number {
    return this._olympics$.value?.length;
  }

  public getMedals(): number[] {
    return this._olympics$.value?.map(
      (olympic: Olympic) => olympic.participations.reduce(
        (sum: number, participation: Participation) => sum + participation.medalsCount, 0)
    )
  }

  public countryIdByIndex(index: number): number {
    return this._olympics$.value[index]?.id || 0;
  }

  public getCountryById(id: number): Olympic|undefined {
    return this._olympics$.value?.find((olympic: Olympic) => olympic.id === id);
  }

  public getNumberOfParticipationsByCountry(id: number): number {
    return this.getCountryById(id)?.participations.length || 0;
  }

  public getCountryNameByCountry(id: number): string {
    return this.getCountryById(id)?.country || "Not found";
  }

  public getNumberOfMedalsByCountry(id: number): number {
    return this.getCountryById(id)?.participations.reduce(
      (sum: number, participation: Participation): number => sum + participation.medalsCount, 0) || 0;
  }

  public getNumberOfAthletesByCountry(id: number): number {
    return this.getCountryById(id)?.participations.reduce(
      (sum: number, participation: Participation): number => sum + participation.athleteCount, 0) || 0;
  }

  public getNumberOfMedalsByGameByCountry(id: number): number[] {
    return this.getCountryById(id)?.participations.map((participation:Participation): number => participation.medalsCount) || [];
  }

  public getParticipationYearsByCountry(id: number): number[] {
    return this.getCountryById(id)?.participations.map((participation:Participation): number => participation.year) || [];
  }
}
