import { Observable } from 'rxjs/Observable';
import { IceCreamMaterialModule } from './../app.module';
import { async, discardPeriodicTasks, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { IceCreamTableComponent, FlavorData } from './ice-cream-table.component';

const STATIC_DATA = [
  { 'votes': 20, 'imageUrl': '/assets/americone_dream.jpg', 'name': 'Americone Dream' },
  { 'votes': 10, 'imageUrl': '/assets/rocky_road.jpg', 'name': 'Rocky Road' }
];

describe('IceCreamTableComponent', () => {
  let component: IceCreamTableComponent;
  let fixture: ComponentFixture<IceCreamTableComponent>;

  const listSub = new Subject<any>();
  const transactionSpy = jasmine.createSpy('transaction');
  const listSpy = jasmine.createSpy('list').and.callFake(() => {
    return listSub.asObservable();
  });

  const angularFireStub: any = {
    list: listSpy,
    database: {
      ref: () => {
        return { transaction: transactionSpy };
      }
    }
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IceCreamTableComponent],
      providers: [
        { provide: AngularFireDatabase, useValue: angularFireStub }
      ],
      imports: [IceCreamMaterialModule, NoopAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IceCreamTableComponent);
    component = fixture.componentInstance;
    listSpy.calls.reset();
    transactionSpy.calls.reset();
    fixture.autoDetectChanges();
  });

  it('should display the flavors', () => {
    listSub.next(STATIC_DATA);
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('md-row');
    expect(listSpy).toHaveBeenCalled();
    expect(rows.length).toEqual(STATIC_DATA.length);
  });

  it('should rate limit votes', fakeAsync(() => {
    listSub.next(STATIC_DATA);
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('md-row');
    const vote = rows[0].querySelectorAll('button')[0];

    vote.click();
    expect(transactionSpy).toHaveBeenCalled();
    transactionSpy.calls.reset();
    tick(100);

    vote.click();
    expect(transactionSpy).not.toHaveBeenCalled();
    tick(1000);

    vote.click();
    expect(transactionSpy).toHaveBeenCalled();
    discardPeriodicTasks();
  }));
});
