import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistUpdateSpecificComponent } from './todolist-update-specific.component';

describe('TodolistUpdateSpecificComponent', () => {
  let component: TodolistUpdateSpecificComponent;
  let fixture: ComponentFixture<TodolistUpdateSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodolistUpdateSpecificComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistUpdateSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
