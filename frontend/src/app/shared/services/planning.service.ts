import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Planning } from '../modeles/planning';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

 // handeleError c'est une fonction des gestions des erreurs ...
 private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for planning consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

public urls = 'http://127.0.0.1:8000/api/v1/maintenance_preventives'; // url pour la récupération de la partie backend(laravel)

constructor(private http: HttpClient) { }
//* afficher tous les plannings*/
getplannings (): Observable<Planning[]> {
return this.http.get<Planning[]>(this.urls).pipe(
  tap(_ => console.log('fetched Books')),
  catchError(this.handleError<Planning[]>('getBooks', []))
);
}


//* ajouter planning*/
createPlanning(planning: Planning): Observable<any> {
  return this.http.post<Planning>(this.urls, planning, httpOptions)
  .pipe(
    tap((newPlanning: Planning) => console.log(`added hero w/ id=${newPlanning.id}`)),
    catchError(this.handleError<Planning>('create'))
  );
}
//* Afficher planning*/
getPlanning(id: number): Observable<any> {
  return this.http.get(`${this.urls}/${id}`);
}
//* modifier planning*/
updatePlanning(planning: Planning,id: number): Observable<any> {
return this.http.put<Planning>(`${this.urls}/${id}`, planning, httpOptions).pipe(
  tap((newPlanning: Planning) => console.log(`utilisateur modifier id=${newPlanning.id}`)),
  catchError(this.handleError('probleme modification', planning))
);
}

//* supprimer planning*/
  deletePlanning(planning: Planning | number): Observable<Planning> {
  const id = typeof planning === 'number' ? planning : planning.id;
  const url = `${this.urls}/${id}`;
  //console.log(id);

  return this.http.delete<Planning>(url, httpOptions).pipe(
    tap(_ => console.log(` utilisateur supprimer  id=${id}`)),
    catchError(this.handleError<Planning>('delete'))
  );
} 
}
