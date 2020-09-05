import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rapport } from '../modeles/rapport';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RapportService {

   // handeleError c'est une fonction des gestions des erreurs ...
 private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for rapport consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

public urls = 'http://127.0.0.1:8000/api/v1/rapports'; // url pour la récupération de la partie backend(laravel)

constructor(private http: HttpClient) { }
//* afficher tous les rapports*/
getrapports (): Observable<Rapport[]> {
return this.http.get<Rapport[]>(this.urls).pipe(
  tap(_ => console.log('fetched Books')),
  catchError(this.handleError<Rapport[]>('getBooks', []))
);
}


//* ajouter rapport*/
createRapport(rapport: Rapport): Observable<any> {
  return this.http.post<Rapport>(this.urls, rapport, httpOptions)
  .pipe(
    tap((newRapport: Rapport) => console.log(rapport)),
    catchError(this.handleError<Rapport>('create'))
  );
}
//* Afficher rapport*/
getRapport(id: number): Observable<any> {
  return this.http.get(`${this.urls}/${id}`);
}
//* modifier rapport*/
updateRapport(rapport: Rapport): Observable<any> {
return this.http.put<Rapport>(`${this.urls}/${rapport.id}`, rapport, httpOptions).pipe(
  tap((newRapport: Rapport) => console.log(`utilisateur modifier id=${newRapport.id}`)),
  catchError(this.handleError('probleme modification', rapport))
);
}

Confirmerrapport(rapport:Rapport , id: number): Observable<any> {
  console.log(rapport);
  console.log(id);
  return this.http.put<Rapport>(`${this.urls}/${id}`, rapport, httpOptions).pipe(
    tap((newRapport: Rapport) => console.log(newRapport)),
    catchError(this.handleError('probleme modification',rapport))
  );
  
  }

  Reporterrapport(rapport, id: number): Observable<any> {
    //console.log(rapport);
    //console.log(id);
    return this.http.put<Rapport>(`${this.urls}/${id}`, rapport, httpOptions).pipe(
      tap((newRapport: Rapport) => console.log(`ok`)),
      catchError(this.handleError('probleme modification'))
    );
    
    }

  //* supprimer equipement*/
  deleteRapport(rapport: Rapport | number): Observable<Rapport> {
    const id = typeof rapport === 'number' ? rapport : rapport.id;
    const url = `${this.urls}/${id}`;
    console.log(id);

    return this.http.delete<Rapport>(url, httpOptions).pipe(
      tap(_ => console.log(` utilisateur supprimer  id=${id}`)),
      catchError(this.handleError<Rapport>('delete'))
    );
  } 
}
