import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrigateCreateOrEditComponent } from './brigate-create-or-edit.component';

describe('BrigateCreateOrEditComponent', () => {
  let component: BrigateCreateOrEditComponent;
  let fixture: ComponentFixture<BrigateCreateOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrigateCreateOrEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrigateCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});