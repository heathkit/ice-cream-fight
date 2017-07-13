import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-ice-cream-table',
  templateUrl: './ice-cream-table.component.html',
  styleUrls: ['./ice-cream-table.component.css']
})
export class IceCreamTableComponent implements OnInit {
  dataSource: FlavorDataSource | null;
  displayedColumns = ['votes', 'image', 'name'];

  constructor() { }

  ngOnInit() {
    this.dataSource = new FlavorDataSource();
  }

}

export interface FlavorData {
  votes: number;
  imageUrl: string;
  name: string;
}

const FLAVORS: FlavorData[] = [
  {votes: 20, imageUrl: '/assets/americone_dream.jpg', name: 'Americone Dream'},
  {votes: 10, imageUrl: '/assets/rocky_road.jpg', name: 'Rocky Road'},
];

export class FlavorDataSource extends DataSource<any> {
  dataChange: BehaviorSubject<FlavorData[]> = new BehaviorSubject<FlavorData[]>([]);

  constructor() {
    super();
    this.dataChange.next(FLAVORS);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<FlavorData[]> {
    return this.dataChange;
  }

  disconnect() {}
}
