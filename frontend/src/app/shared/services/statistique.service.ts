import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Statistique } from '../modeles/statistique';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
// handeleError c'est une fonction des gestions des erreurs ...
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for equipement consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public urls = 'http://127.0.0.1:8000/api/v1/statistique'; // url pour la récupération de la partie backend(laravel)

  constructor(private http: HttpClient) { }
  //* afficher tous les equipements*/
  getstat (): Observable<Statistique[]> {
    return this.http.get<Statistique[]>(this.urls).pipe(
      tap(_ => console.log('fetched Books')),
      catchError(this.handleError<Statistique[]>('getBooks', []))
    );
  }

  getpieces (): Observable<Statistique[]> {
    return this.http.get<Statistique[]>(this.urls).pipe(
      tap(_ => console.log('fetched Books')),
      catchError(this.handleError<Statistique[]>('getBooks', []))
    );
  }

 
  
}
