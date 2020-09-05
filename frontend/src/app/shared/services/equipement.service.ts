import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Equipement } from '../modeles/equipement';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EquipementService {
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

  public urls = 'http://127.0.0.1:8000/api/v1/equipements'; // url pour la récupération de la partie backend(laravel)

  constructor(private http: HttpClient) { }
  //* afficher tous les equipements*/
  getequipements (): Observable<Equipement[]> {
  return this.http.get<Equipement[]>(this.urls).pipe(
    tap(_ => console.log('fetched Books')),
    catchError(this.handleError<Equipement[]>('getBooks', []))
  );
}

 
  //* ajouter equipement*/
  createEquipement(equipement: Equipement): Observable<any> {
    return this.http.post<Equipement>(this.urls, equipement, httpOptions)
    .pipe(
      tap((newEquipement: Equipement) => console.log(`added hero w/ id=${newEquipement.id}`)),
      catchError(this.handleError<Equipement>('create'))
    );
  }
//* Afficher equipement*/
  getEquipement(id: number): Observable<any> {
    return this.http.get(`${this.urls}/${id}`);
  }
  //* modifier equipement*/
 updateEquipement(equipement: Equipement,id: number): Observable<any> {
  return this.http.put<Equipement>(`${this.urls}/${id}`, equipement, httpOptions).pipe(
    tap((newEquipement: Equipement) => console.log(`utilisateur modifier id=${newEquipement.id}`)),
    catchError(this.handleError('probleme modification', equipement))
  );
}

  //* supprimer equipement*/
    deleteEquipement(equipement: Equipement | number): Observable<Equipement> {
    const id = typeof equipement === 'number' ? equipement : equipement.id;
    const url = `${this.urls}/${id}`;
    //console.log(id);

    return this.http.delete<Equipement>(url, httpOptions).pipe(
      tap(_ => console.log(` utilisateur supprimer  id=${id}`)),
      catchError(this.handleError<Equipement>('delete'))
    );
  } 
}
