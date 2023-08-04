import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedproductsComponent } from './featuredproducts.component';

describe('FeaturedproductsComponent', () => {
  let component: FeaturedproductsComponent;
  let fixture: ComponentFixture<FeaturedproductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedproductsComponent]
    });
    fixture = TestBed.createComponent(FeaturedproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
