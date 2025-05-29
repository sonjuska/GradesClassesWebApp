import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RazrediIzmeniComponent } from './razredi-izmeni.component';

describe('RazrediIzmeniComponent', () => {
  let component: RazrediIzmeniComponent;
  let fixture: ComponentFixture<RazrediIzmeniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RazrediIzmeniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RazrediIzmeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
