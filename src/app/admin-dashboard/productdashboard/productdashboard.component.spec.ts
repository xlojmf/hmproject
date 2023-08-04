import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdashboardComponent } from './productdashboard.component';

describe('ProductdashboardComponent', () => {
  let component: ProductdashboardComponent;
  let fixture: ComponentFixture<ProductdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductdashboardComponent]
    });
    fixture = TestBed.createComponent(ProductdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
