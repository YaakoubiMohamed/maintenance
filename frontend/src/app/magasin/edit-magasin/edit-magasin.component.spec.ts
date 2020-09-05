import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMagasinComponent } from './edit-magasin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('EditMagasinComponent', () => {
  let component: EditMagasinComponent;
  let fixture: ComponentFixture<EditMagasinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMagasinComponent ],
      imports: [FormsModule,
        ReactiveFormsModule,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
