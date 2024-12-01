import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDataIntoExcelComponent } from './print-data-into-excel.component';

describe('PrintDataIntoExcelComponent', () => {
  let component: PrintDataIntoExcelComponent;
  let fixture: ComponentFixture<PrintDataIntoExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintDataIntoExcelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintDataIntoExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
