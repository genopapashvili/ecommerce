import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingMenuComponent } from './landing-menu.component';

describe('LandingMenuComponent', () => {
  let component: LandingMenuComponent;
  let fixture: ComponentFixture<LandingMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingMenuComponent]
    });
    fixture = TestBed.createComponent(LandingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
