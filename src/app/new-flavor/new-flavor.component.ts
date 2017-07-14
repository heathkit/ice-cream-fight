import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-flavor',
  templateUrl: './new-flavor.component.html',
  styleUrls: ['./new-flavor.component.css']
})
export class NewFlavorComponent implements OnInit {
  @ViewChild(NgForm)
  private form: NgForm;

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
  }

  addFlavor() {
    const res = this.db.database.ref('/flavors').push({
      name: this.form.value['flavorName'],
      imageUrl: this.form.value['imageUrl'],
      votes: 0
    });
    console.log(res);
  }

}
