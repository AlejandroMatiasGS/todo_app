import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchTheme } from './switch-theme';

describe('SwitchTheme', () => {
  let component: SwitchTheme;
  let fixture: ComponentFixture<SwitchTheme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchTheme]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchTheme);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
