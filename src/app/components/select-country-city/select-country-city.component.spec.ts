import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCountryCityComponent } from './select-country-city.component';

describe('SelectCountryCityComponent', () => {
  let component: SelectCountryCityComponent;
  let fixture: ComponentFixture<SelectCountryCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCountryCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCountryCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
