import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdeljenjaDodajComponent } from './odeljenja-dodaj.component';

describe('OdeljenjaDodajComponent', () => {
  let component: OdeljenjaDodajComponent;
  let fixture: ComponentFixture<OdeljenjaDodajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OdeljenjaDodajComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdeljenjaDodajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
