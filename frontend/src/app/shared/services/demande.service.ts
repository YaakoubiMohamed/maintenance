import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Demande } from '../modeles/demande';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

 // handeleError c'est une fonction des gestions des erreurs ...
 private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for demande consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

public urls = 'http://127.0.0.1:8000/api/v1/demandes'; // url pour la récupération de la partie backend(laravel)

constructor(private http: HttpClient) { }
//* afficher tous les demandes*/
getdemandes (): Observable<Demande[]> {
return this.http.get<Demande[]>(this.urls).pipe(
  tap(_ => console.log('fetched Books')),
  catchError(this.handleError<Demande[]>('getBooks', []))
);
}


//* ajouter demande*/
createDemande(demande: Demande): Observable<any> {
  return this.http.post<Demande>(this.urls, demande, httpOptions)
  .pipe(
    tap((newDemande: Demande) => console.log(`added hero w/ id=${newDemande.id}`)),
    catchError(this.handleError<Demande>('create'))
  );
}
//* Afficher demande*/
getDemande(id: number): Observable<any> {
  return this.http.get(`${this.urls}/${id}`);
}
//* modifier demande*/
updateDemande(demande: Demande,id: number): Observable<any> {
return this.http.put<Demande>(`${this.urls}/${id}`, demande, httpOptions).pipe(
  tap((newDemande: Demande) => console.log(`utilisateur modifier id=${newDemande.id}`)),
  catchError(this.handleError('probleme modification', demande))
);
}

Confirmerdemande(demande:Demande , id: number): Observable<any> {
  console.log(demande);
  console.log(id);
  return this.http.put<Demande>(`${this.urls}/${id}`, demande, httpOptions).pipe(
    tap((newDemande: Demande) => console.log(newDemande)),
    catchError(this.handleError('probleme modification',demande))
  );
  
  }

  Reporterdemande(demande, id: number): Observable<any> {
    //console.log(demande);
    //console.log(id);
    return this.http.put<Demande>(`${this.urls}/${id}`, demande, httpOptions).pipe(
      tap((newDemande: Demande) => console.log(`ok`)),
      catchError(this.handleError('probleme modification'))
    );
    
    }

  //* supprimer equipement*/
  deleteDemande(demande: Demande | number): Observable<Demande> {
    const id = typeof demande === 'number' ? demande : demande.id;
    const url = `${this.urls}/${id}`;
    //console.log(id);

    return this.http.delete<Demande>(url, httpOptions).pipe(
      tap(_ => console.log(` utilisateur supprimer  id=${id}`)),
      catchError(this.handleError<Demande>('delete'))
    );
  } 

}
