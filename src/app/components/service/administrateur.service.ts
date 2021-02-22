import { Administrateur } from './../models/administrateur.models';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:9592/admins';
@Injectable({
  providedIn: 'root'
})
export class AdministrateurService {

  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getAdmins(): Observable<Administrateur[]> {
    return this.http.get<Administrateur[]>(`${apiUrl}` + '/all')
      .pipe(
        tap(a => console.log('fetched admins')),
        catchError(this.handleError('getAdmins', []))
      );
  }

  getAdminById(id: BigInteger): Observable<Administrateur> {
    const url = `${apiUrl}` + '/admin' + `/${id}`;
    return this.http.get<Administrateur>(url).pipe(
      tap(a => console.log(`fetched admins id=${id}`)),
      catchError(this.handleError<Administrateur>(`getAdminById id=${id}`))
    );
  }

  addAdmin(administrateur: Administrateur): Observable<Administrateur> {
    return this.http.post<Administrateur>(apiUrl + '/newadmin', administrateur, httpOptions).pipe(
      tap((a: Administrateur) => console.log(`added Admin / id=${a.id}`)),
      catchError(this.handleError<Administrateur>('addAdmin'))
    );
  }

  updateAdmin(id: BigInteger, administrateur: Administrateur): Observable<any> {
    const url = `${apiUrl}` + '/admin' + `/${id}`;
    return this.http.put(url, administrateur, httpOptions).pipe(
      tap(a => console.log(`updated Admin id=${id}`)),
      catchError(this.handleError<any>('updateAdmin'))
    );
  }

  deleteAdmin(id: BigInteger): Observable<Administrateur> {
    const url = `${apiUrl}` + '/admin' + `/${id}`;
    return this.http.delete<Administrateur>(url, httpOptions).pipe(
      tap(a => console.log(`deleted Admin id=${id}`)),
      catchError(this.handleError<Administrateur>('deleteAdmin'))
    );
  }}
