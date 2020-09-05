import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Planning } from '../modeles/planning';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for magasin consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public urls = 'http://127.0.0.1:8000/api/v1/maintenance_preventives'; // url pour la récupération de la partie backend(laravel)

constructor(private http: HttpClient) { }
//* afficher tous les plannings*/
getNotification (): Observable<Planning[]> {
return this.http.get<Planning[]>(this.urls).pipe(
  tap(_ => console.log('fetched Books')),
  catchError(this.handleError<Planning[]>('getBooks', []))
);
}

}
