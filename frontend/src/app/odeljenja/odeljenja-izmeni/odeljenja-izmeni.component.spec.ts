import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdeljenjaIzmeniComponent } from './odeljenja-izmeni.component';

describe('OdeljenjaIzmeniComponent', () => {
  let component: OdeljenjaIzmeniComponent;
  let fixture: ComponentFixture<OdeljenjaIzmeniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OdeljenjaIzmeniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdeljenjaIzmeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
