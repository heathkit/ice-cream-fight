import { MdSnackBar } from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';

export interface FlavorData {
  votes: number;
  imageUrl: string;
  name: string;
}

@Injectable()
export class FlavorService {

  constructor(private db: AngularFireDatabase, private snackBar: MdSnackBar) { }

  addFlavor(name: string, url: string) {
    const res = this.db.database.ref('/flavors').push({
      name: name,
      imageUrl: url,
      votes: 0
    }).then(() => {
      this.snackBar.open('Flavor added!', undefined, { duration: 2000 });
    });
  }

  getFlavors() {
    const flavorList = this.db.list('/flavors', { query: { orderByChild: 'votes' } })
      .map((array) => array.slice().reverse()) as FirebaseListObservable<FlavorData[]>;
    return flavorList;
  }

  addVote(id: string) {
    const ref = this.db.database.ref(`/flavors/${id}/votes`);
    ref.transaction((currentVotes) => currentVotes + 1);
  }
}
