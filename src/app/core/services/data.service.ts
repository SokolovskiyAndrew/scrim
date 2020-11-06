import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CustomerInterface, IOrderInterface} from '../../shared/interfaces/customer.interface';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = 'assets/';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<CustomerInterface[]> {
    return this.http.get<CustomerInterface[]>(this.baseUrl + 'customers.json')
      .pipe(
        catchError(this.handleError)
      )
  }

  getCustomer(id: number): Observable<CustomerInterface> {
    return this.http.get<CustomerInterface[]>(this.baseUrl + 'customers.json')
      .pipe(
        map(customers => {
          const customer = customers.filter((cust: CustomerInterface) => cust.id === id);
          return (customer && customers.length) ? customer[0] : null;
        }),
        catchError(this.handleError)
      );
  }

  getOrders(id: number): Observable<IOrderInterface[]> {
    return this.http.get<IOrderInterface[]>(this.baseUrl + 'orders.json')
      .pipe(
        map(orders => {
          const custOrders = orders.filter((order) => order.customerId === id);
          return custOrders;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<any> {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || 'Node.js server error');
  }
}
