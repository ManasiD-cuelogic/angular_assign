import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistUpdateComponent } from './todolist-update.component';

describe('TodolistUpdateComponent', () => {
  let component: TodolistUpdateComponent;
  let fixture: ComponentFixture<TodolistUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodolistUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
