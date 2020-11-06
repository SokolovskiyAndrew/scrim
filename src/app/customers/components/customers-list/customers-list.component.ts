import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CustomerInterface} from '../../../shared/interfaces/customer.interface';
import {SorterService} from "../../../core/services/sorter.service";

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _customers: CustomerInterface[];

  @Input() get customers(): CustomerInterface[] {
    return this._customers;
  }

  set customers(value) {
    if (value) {
      this.filteredCustomers = this._customers = value;
      this.calculateOrders();
    }
  }

  filteredCustomers: CustomerInterface[] = [];
  customersOrderTotal: number;
  currencyCode: 'USD';

  constructor(private sorterService: SorterService) { }

  ngOnInit(): void {
    this.filteredCustomers = this.customers;
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //
  // }


  calculateOrders(): void {
    this.customersOrderTotal = 0;
    this.filteredCustomers.forEach((customer) => {
      this.customersOrderTotal += customer.orderTotal;
    });
  }

  sort(prop: string): void {
    this.sorterService.sort(this.filteredCustomers, prop)
  }

  filter(data: string): void {
    if (data) {
      this.filteredCustomers = this.customers.filter((customer) => {
       return customer.name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
              customer.city.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
              customer.orderTotal.toString().indexOf(data) > -1;
      });
    } else {
      this.filteredCustomers = this.customers;
    }
    this.calculateOrders();
  }
}
