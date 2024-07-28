import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrigateDetailComponent } from './brigate-detail.component';

describe('BrigateDetailComponent', () => {
  let component: BrigateDetailComponent;
  let fixture: ComponentFixture<BrigateDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrigateDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrigateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});