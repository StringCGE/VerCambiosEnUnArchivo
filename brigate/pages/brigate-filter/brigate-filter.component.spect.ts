import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrigateFilterComponent } from './brigate-filter.component';

describe('BrigateFilterComponent', () => {
  let component: BrigateFilterComponent;
  let fixture: ComponentFixture<BrigateFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrigateFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrigateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});