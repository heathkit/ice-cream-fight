import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { GroupedObservable } from 'rxjs/operator/groupBy';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/groupBy';

const VOTE_DELAY = 750;

@Component({
  selector: 'app-ice-cream-table',
  templateUrl: './ice-cream-table.component.html',
  styleUrls: ['./ice-cream-table.component.css'],
  animations: [
    trigger('pulse', [
      state('in', style({ background: 'white' })),
      transition('void => in', [
        style({ background: 'lightseagreen' }),
        animate('350ms ease-out')
      ]),
    ])
  ]
})
export class IceCreamTableComponent implements OnInit, OnDestroy {
  dataSource: FlavorDataSource | null;
  displayedColumns = ['votes', 'image', 'name', 'like'];
  private vote = new Subject<any>();
  vote$ = this.vote.asObservable();
  pulseState = '';
  disabled: { [key: number]: boolean } = {};

  voteSub: Subscription;

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    // Workaround for https://github.com/angular/material2/issues/5593
    setTimeout(() => {
      this.dataSource = new FlavorDataSource(this.db);
    }, 1);

    // Enable update pulses after 3s, so the initial load doesn't flash.
    setTimeout(() => {
      this.pulseState = 'in';
    }, 3000);

    this.voteSub = this.vote$.groupBy(s => s).subscribe((value: any) => {
      const id = value.key;
      value.throttleTime(VOTE_DELAY - 250).subscribe(() => {
        const ref = this.db.database.ref(`/flavors/${id}/votes`);
        ref.transaction((currentVotes) => currentVotes + 1);
        this.disabled[id] = true;
      });
    });

    this.vote$.delay(VOTE_DELAY).forEach((id) => {
      this.disabled[id] = false;
    });
  }

  ngOnDestroy() {
    this.voteSub.unsubscribe();
  }
}

export interface FlavorData {
  votes: number;
  imageUrl: string;
  name: string;
}

export class FlavorDataSource extends DataSource<any> {
  constructor(private db: AngularFireDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<FlavorData[]> {
    const flavorList = this.db.list('/flavors', { query: { orderByChild: 'votes' } })
      .map((array) => array.slice().reverse()) as FirebaseListObservable<FlavorData[]>;
    return flavorList;
  }

  disconnect() {
  }
}
