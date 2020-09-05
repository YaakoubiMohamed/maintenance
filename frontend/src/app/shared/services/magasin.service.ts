import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Magasin } from '../modeles/magasin';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MagasinService {

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

  public urls = 'http://127.0.0.1:8000/api/v1/pieces';

  constructor(private http: HttpClient) { }
  //* afficher tous les magasins*/
  getmagasins (): Observable<Magasin[]> {
  return this.http.get<Magasin[]>(this.urls).pipe(
    tap(_ => console.log('fetched Books')),
    catchError(this.handleError<Magasin[]>('getBooks', []))
  );
}

 
  //* ajouter magasin*/
  createMagasin(magasin: Magasin): Observable<any> {
    return this.http.post<Magasin>(this.urls, magasin, httpOptions)
    .pipe(
      tap((newMagasin: Magasin) => console.log(`added hero w/ id=${newMagasin.id}`)),
      catchError(this.handleError<Magasin>('create'))
    );
  }
//* Afficher magasin*/
  getMagasin(id: number): Observable<any> {
    return this.http.get(`${this.urls}/${id}`);
  }
  //* modifier magasin*/
 updateMagasin(magasin: Magasin,id: number): Observable<any> {
  return this.http.put<Magasin>(`${this.urls}/${id}`, magasin, httpOptions).pipe(
    tap((newMagasin: Magasin) => console.log(`utilisateur modifier id=${newMagasin.id}`)),
    catchError(this.handleError('probleme modification', magasin))
  );
}

  //* supprimer magasin*/
    deleteMagasin(magasin: Magasin | number): Observable<Magasin> {
    const id = typeof magasin === 'number' ? magasin : magasin.id;
    const url = `${this.urls}/${id}`;
    //console.log(id);

    return this.http.delete<Magasin>(url, httpOptions).pipe(
      tap(_ => console.log(` utilisateur supprimer  id=${id}`)),
      catchError(this.handleError<Magasin>('delete'))
    );
  } 
}
