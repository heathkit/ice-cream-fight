import { MdSnackBar } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { TestBed, inject } from '@angular/core/testing';

import { FlavorService } from './flavor.service';

describe('FlavorService', () => {
  const fakeDb: any = {};
  const fakeSnackBar: any = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlavorService,
        {provide: AngularFireDatabase, useValue: fakeDb},
        {provide: MdSnackBar, useValue: fakeSnackBar}]
    });
  });

  it('should be created', inject([FlavorService], (service: FlavorService) => {
    expect(service).toBeTruthy();
  }));
});
