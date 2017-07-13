import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-ice-cream-table',
  templateUrl: './ice-cream-table.component.html',
  styleUrls: ['./ice-cream-table.component.css']
})
export class IceCreamTableComponent implements OnInit {
  dataSource: FlavorDataSource | null;
  displayedColumns = ['votes', 'image', 'name'];

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.dataSource = new FlavorDataSource(this.db);
  }

}

export interface FlavorData {
  votes: number;
  imageUrl: string;
  name: string;
}

export class FlavorDataSource extends DataSource<any> {
  dataChange: BehaviorSubject<FlavorData[]> = new BehaviorSubject<FlavorData[]>([]);

  constructor(private db: AngularFireDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<FlavorData[]> {
    return this.db.list('/flavors');
  }

  disconnect() {}
}
