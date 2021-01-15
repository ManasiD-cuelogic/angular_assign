import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileShowComponent } from './user-profile-show.component';

describe('UserProfileShowComponent', () => {
  let component: UserProfileShowComponent;
  let fixture: ComponentFixture<UserProfileShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
