import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyHistoryGraphComponent } from './currency-history-graph.component';

describe('CurrencyHistoryGraphComponent', () => {
  let component: CurrencyHistoryGraphComponent;
  let fixture: ComponentFixture<CurrencyHistoryGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyHistoryGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrencyHistoryGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
