import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Participation } from "../models/Participation";
import {Olympic} from "../models/Olympic";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private http = inject(HttpClient)
  private olympicUrl = './assets/mock/olympic.json';

  private _olympics$ = new BehaviorSubject<Olympic[]>([]);
  private _errorMessage$ = new BehaviorSubject<string|null>(null);

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value: Olympic[]) => this._olympics$.next(value)),
      catchError((error, caught): Observable<Olympic[]> => {
        const msg = error.status === 404 ? 'les données sont introuvables.':`erreur inconnue (${error.status}).`
        this._errorMessage$.next(msg);
        this._olympics$.next([]);
        return of([]);
      })
    );
  }

  get olympics(): Observable<Olympic[]> {
    return this._olympics$.asObservable();
  }

  get errorMessage(): Observable<string|null> {
    return this._errorMessage$.asObservable();
  }

  public getNumberOfGames(): number {
    const gameYears : number[] = [];
    this._olympics$.value?.forEach(
      (olympic: Olympic): void => olympic.participations.forEach(
        (participation: Participation): number => gameYears.push(participation.year)
      )
    )
    return new Set(gameYears).size;
  }

  public getCountries(): string[] {
    return this._olympics$.value?.map((olympic: Olympic): string => olympic.country);
  }

  public getNumberOfCountries(): number {
    return this._olympics$.value?.length;
  }

  public getMedals(): number[] {
    return this._olympics$.value?.map(
      (olympic: Olympic): number => olympic.participations.reduce(
        (sum: number, participation: Participation): number => sum + participation.medalsCount, 0)
    )
  }

  public countryIdByIndex(index: number): number {
    return this._olympics$.value[index]?.id || 0;
  }

  public getCountryById(id: number): Olympic|undefined {
    return this._olympics$.value?.find((olympic: Olympic): boolean => olympic.id === id);
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
