import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Location } from '../models/location.models';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:9592/locations';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  


  addLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(apiUrl + '/newlocations', location, httpOptions).pipe(
      tap((l: Location) => console.log(`added Locations / id=${l.id}`)),
      catchError(this.handleError<Location>('addLocations'))
    );
  }

 
  
}
