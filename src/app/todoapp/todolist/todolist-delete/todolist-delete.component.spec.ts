import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistDeleteComponent } from './todolist-delete.component';

describe('TodolistDeleteComponent', () => {
  let component: TodolistDeleteComponent;
  let fixture: ComponentFixture<TodolistDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodolistDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
