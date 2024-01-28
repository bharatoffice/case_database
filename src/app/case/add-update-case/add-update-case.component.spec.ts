import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateCaseComponent } from './add-update-case.component';

describe('AddUpdateCaseComponent', () => {
  let component: AddUpdateCaseComponent;
  let fixture: ComponentFixture<AddUpdateCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateCaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
