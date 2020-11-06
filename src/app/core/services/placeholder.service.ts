import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ErrandInterface} from '../../shared/interfaces/errand.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaceholderService {

  constructor(private http: HttpClient) { }

  getTodoOne(quantity): Observable<ErrandInterface> {
    return this.http.get<ErrandInterface>(`https://jsonplaceholder.typicode.com/todos/${quantity}`);
  }

  getTodoTwo(): Observable<ErrandInterface[]> {
    return this.http.get<ErrandInterface[]>('https://jsonplaceholder.typicode.com/todos?_limit=50');
  }

  completeErrand(id): Observable<ErrandInterface> {
    return this.http.put<ErrandInterface>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      completed: true
    });
  }
}
