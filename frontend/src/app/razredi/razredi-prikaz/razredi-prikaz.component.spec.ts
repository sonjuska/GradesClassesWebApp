import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RazrediPrikazComponent } from './razredi-prikaz.component';

describe('RazrediPrikazComponent', () => {
  let component: RazrediPrikazComponent;
  let fixture: ComponentFixture<RazrediPrikazComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RazrediPrikazComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RazrediPrikazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
