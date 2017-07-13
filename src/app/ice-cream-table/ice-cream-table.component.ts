import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// Needed to use on the flavor list!
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-ice-cream-table',
  templateUrl: './ice-cream-table.component.html',
  styleUrls: ['./ice-cream-table.component.css']
})
export class IceCreamTableComponent implements OnInit {
  dataSource: FlavorDataSource | null;
  displayedColumns = ['votes', 'image', 'name', 'like'];

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.dataSource = new FlavorDataSource(this.db);
  }

  public voteFor(id: any) {
    console.log(id);
    const ref = this.db.database.ref(`/flavors/${id}/votes`);
    ref.transaction((currentVotes) => currentVotes + 1);
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
    this.votesSubject = new Subject<any>();
    this.votesSubject.forEach((x) => { console.log('Subject ', x);});
  }

  votesSubject: Subject<any>;

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<FlavorData[]> {
    return this.db.list('/flavors', {query: {orderByChild: 'votes'}})
      .map((array) => array.reverse()) as FirebaseListObservable<FlavorData[]>;
  }

  disconnect() {}
}
