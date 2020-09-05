import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandetechnicienComponent } from './demandetechnicien.component';

describe('DemandetechnicienComponent', () => {
  let component: DemandetechnicienComponent;
  let fixture: ComponentFixture<DemandetechnicienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandetechnicienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandetechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
