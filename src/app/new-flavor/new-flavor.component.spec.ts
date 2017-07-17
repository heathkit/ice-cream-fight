import { RouterModule, Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NewFlavorComponent } from './new-flavor.component';
import { FlavorService } from '../flavor.service';


describe('NewFlavorComponent', () => {
  let component: NewFlavorComponent;
  let fixture: ComponentFixture<NewFlavorComponent>;

  const fakeFlavorService = {};
  const fakeRouter = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewFlavorComponent],
      providers: [
        { provide: FlavorService, useValue: fakeFlavorService },
        { provide: Router, useValue: fakeRouter }],
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFlavorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
