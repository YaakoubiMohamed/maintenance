import { Injectable } from '@angular/core';
import { User } from '../modeles/user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public urls = 'http://127.0.0.1:8000/api/v1/users';

  constructor(private http: HttpClient) { }

  getusers (): Observable<User[]> {
  return this.http.get<User[]>(this.urls).pipe(
    tap(_ => console.log('fetched Books')),
    catchError(this.handleError<User[]>('getBooks', []))
  );
}
getAll() {
  return this.http.get<User[]>(`${environment.apiUrl}/api/v1/users`);
}
 

  createUser(user: User): Observable<any> {
    return this.http.post<User>(this.urls, user, httpOptions)
    .pipe(
      tap((newUser: User) => console.log(`added hero w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('create'))
    );
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.urls}/${id}`);
  }
  
 updateUser(user: User,id: number): Observable<any> {
  return this.http.put<User>(`${this.urls}/${id}`, user, httpOptions).pipe(
    tap((newUser: User) => console.log(`utilisateur modifier id=${newUser.id}`)),
    catchError(this.handleError('probleme modification', user))
  );
}


  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.urls}/${id}`;
    //console.log(id);

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => console.log(` utilisateur supprimer  id=${id}`)),
      catchError(this.handleError<User>('delete'))
    );
  }

  findUsers(
    courseId:number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3):  Observable<User[]> {

    return this.http.get('/api/lessons', {
        params: new HttpParams()
            .set('courseId', courseId.toString())
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
    }).pipe(
        map(res =>  res["payload"])
    );
}
}