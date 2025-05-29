import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdeljenjaPrikazComponent } from './odeljenja-prikaz.component';

describe('OdeljenjaPrikazComponent', () => {
  let component: OdeljenjaPrikazComponent;
  let fixture: ComponentFixture<OdeljenjaPrikazComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OdeljenjaPrikazComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdeljenjaPrikazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
