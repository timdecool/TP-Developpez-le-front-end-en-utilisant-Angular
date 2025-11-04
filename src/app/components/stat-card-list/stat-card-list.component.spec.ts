import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatCardListComponent } from './stat-card-list.component';

describe('StatCardListComponent', () => {
  let component: StatCardListComponent;
  let fixture: ComponentFixture<StatCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
