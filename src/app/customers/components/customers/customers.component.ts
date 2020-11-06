import { Component, OnInit } from '@angular/core';
import {CustomerInterface} from '../../../shared/interfaces/customer.interface';
import {DataService} from '../../../core/services/data.service';
import {PlaceholderService} from '../../../core/services/placeholder.service';
import {ErrandInterface} from '../../../shared/interfaces/errand.interface';
import {forkJoin, Observable, of, zip} from 'rxjs';
import {catchError, map, merge, mergeAll, mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  title: string;
  people: CustomerInterface[];
  errand: ErrandInterface;
  fewErrands: ErrandInterface[];
  first$: Observable<ErrandInterface>;
  second$: Observable<ErrandInterface>;
  third$: Observable<ErrandInterface> | Observable<any>;

  constructor(
    private dataService: DataService,
    private placeholderService: PlaceholderService
  ) { }

  ngOnInit(): void {
    this.title = 'Customers';
    this.dataService.getCustomers()
      .subscribe(customers => this.people = customers);

    this.first$ = this.placeholderService.getTodoOne(1);
    this.second$ = this.placeholderService.getTodoOne(2);
    this.third$ = this.placeholderService.getTodoOne(20)
      .pipe(
        catchError(err => of({isError: true, error: err}))
      );
    // this.fewErrands$ = this.placeholderService.getTodoTwo();
    this.forkObservables();
    this.getTwoErrand();
  }

  getOneErrand(quantity): void {
    this.placeholderService.getTodoOne(quantity)
      .subscribe(response => this.errand = response);
  }

  getTwoErrand(): void {
    this.placeholderService.getTodoTwo()
      // .pipe(
      //   map(errands => errands.filter(errand => errand.completed === true)),
      // )
      .subscribe(response => this.fewErrands = response);
  }

  forkObservables(): void {
    zip(this.first$, this.second$, this.third$)
      .subscribe(
        response => console.log(response)
      );
  }

  changeComplete(id: number): void {
    this.placeholderService.completeErrand(id)
      .subscribe(item => {
        this.fewErrands.find(errand => errand.id === item.id).completed = true;
      });
  }
}
