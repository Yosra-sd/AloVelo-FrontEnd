import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Velos } from '../Models/velos.models';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:9592/velos';

@Injectable({
  providedIn: 'root'
})
export class VelosService {

  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getVelo(): Observable<Velos[]> {
    return this.http.get<Velos[]>(`${apiUrl}` + '/all')
      .pipe(
        tap(v => console.log('fetched velos')),
        catchError(this.handleError('getVelos', []))
      );
  }

  getVeloById(code: BigInteger): Observable<Velos> {
    const url = `${apiUrl}` + '/velos' + `/${code}`;
    return this.http.get<Velos>(url).pipe(
      tap(v => console.log(`fetched velos code=${code}`)),
      catchError(this.handleError<Velos>(`getVeloById code=${code}`))
    );
  }

  addVelo(velos: Velos): Observable<Velos> {
    return this.http.post<Velos>(apiUrl + '/newvelo', velos, httpOptions).pipe(
      tap((v: Velos) => console.log(`added Velo / code=${v.code}`)),
      catchError(this.handleError<Velos>('addVelo'))
    );
  }

  updateVelo(code: BigInteger, velos: Velos): Observable<any> {
    const url = `${apiUrl}` + '/velos' + `/${code}`;
    return this.http.put(url, velos, httpOptions).pipe(
      tap(v => console.log(`updated Velo code=${code}`)),
      catchError(this.handleError<any>('updateVelo'))
    );
  }

  deleteVelo(code: BigInteger): Observable<Velos> {
    const url = `${apiUrl}` + '/velos' + `/${code}`;
    return this.http.delete<Velos>(url, httpOptions).pipe(
      tap(v => console.log(`deleted Velo code=${code}`)),
      catchError(this.handleError<Velos>('deleteVelo'))
    );
  }
}
