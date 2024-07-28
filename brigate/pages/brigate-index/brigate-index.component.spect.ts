import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrigateIndexComponent } from './brigate-index.component';

describe('BrigateIndexComponent', () => {
  let component: BrigateIndexComponent;
  let fixture: ComponentFixture<BrigateIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrigateIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrigateIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});