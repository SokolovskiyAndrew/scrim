import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filter-textbox',
  templateUrl: './filter-textbox.component.html',
  styleUrls: ['./filter-textbox.component.scss']
})
export class FilterTextboxComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _filter: string;
  @Input()
  get filter(): string {
    return this._filter;
  }

  set filter(value) {
    this._filter = value;
    this.changed.emit(this.filter);
  }

  @Output() changed: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
