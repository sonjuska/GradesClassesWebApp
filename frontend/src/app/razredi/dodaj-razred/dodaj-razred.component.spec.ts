import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajRazredComponent } from './dodaj-razred.component';

describe('DodajRazredComponent', () => {
  let component: DodajRazredComponent;
  let fixture: ComponentFixture<DodajRazredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DodajRazredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodajRazredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
