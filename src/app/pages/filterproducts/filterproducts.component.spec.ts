import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterproductsComponent } from './filterproducts.component';

describe('FilterproductsComponent', () => {
  let component: FilterproductsComponent;
  let fixture: ComponentFixture<FilterproductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterproductsComponent]
    });
    fixture = TestBed.createComponent(FilterproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
