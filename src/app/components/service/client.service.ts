import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Client } from '../Models/client.models';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:9592/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getCompetitions(): Observable<Client[]> {
    return this.http.get<Client[]>(`${apiUrl}` + '/all')
      .pipe(
        tap(c => console.log('fetched clients')),
        catchError(this.handleError('getClients', []))
      );
  }

  getClientById(id: BigInteger): Observable<Client> {
    const url = `${apiUrl}` + '/client' + `/${id}`;
    return this.http.get<Client>(url).pipe(
      tap(c => console.log(`fetched clients id=${id}`)),
      catchError(this.handleError<Client>(`getClientById id=${id}`))
    );
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(apiUrl + '/newclient', client, httpOptions).pipe(
      tap((c: Client) => console.log(`added Client / id=${c.id}`)),
      catchError(this.handleError<Client>('addClient'))
    );
  }

  updateClient(id: BigInteger, client: Client): Observable<any> {
    const url = `${apiUrl}` + '/client' + `/${id}`;
    return this.http.put(url, client, httpOptions).pipe(
      tap(c => console.log(`updated Client id=${id}`)),
      catchError(this.handleError<any>('updateClient'))
    );
  }

  deleteClient(id: BigInteger): Observable<Client> {
    const url = `${apiUrl}` + '/client' + `/${id}`;
    return this.http.delete<Client>(url, httpOptions).pipe(
      tap(c => console.log(`deleted Client id=${id}`)),
      catchError(this.handleError<Client>('deleteClient'))
    );
  }
}
