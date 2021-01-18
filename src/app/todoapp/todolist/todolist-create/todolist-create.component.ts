import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-todolist-create',
  templateUrl: './todolist-create.component.html',
  styleUrls: ['./todolist-create.component.css']
})
export class TodolistCreateComponent implements OnInit {
  toDoListForm: FormGroup;
  addReminderDateDynamically: boolean;
  minDate: Date;
  warningMessage: string;
  flashMessage: boolean = false;
  constructor(private frmbuilder: FormBuilder,
    private UserService: UserService,
    private route: Router) {
    this.toDoListForm = frmbuilder.group({
      name: ['', Validators.required],
      creationDate: ['', Validators.required],
      isReminder: ['', Validators.required],
      categorie: ['', Validators.required],
      status: ['', Validators.required],
      isPublic: ['', Validators.required],
      reminderDate: ['']
    });

    const today = new Date();
    this.minDate = new Date(today);

  }

  

  ngOnInit(): void {
  }
  createToDOList(toDoListForm) {
    // stop here if form is invalid
    if (this.toDoListForm.invalid) {
      return;
    }

    const name = toDoListForm.get('name').value;
    const creationDate = toDoListForm.get('creationDate').value;
    const isReminder = toDoListForm.get('isReminder').value;
    const categorie = toDoListForm.get('categorie').value;
    const status = toDoListForm.get('status').value;
    const isPublic = toDoListForm.get('isPublic').value;
    let reminderDate: any;

    if (this.UserService.checkingDuplicateListName(name) == true) {
      this.warningMessage = "Duplicate todolist names"
      this.flashMessage = true;
      return;
    }

    if (this.addReminderDateDynamically == true && toDoListForm.get('reminderDate').value == "") {
      this.warningMessage = "Please select reminder date"
      this.flashMessage = true;
      return;
    } else if (this.addReminderDateDynamically == false) {
      reminderDate = "NA";
    } else if (this.addReminderDateDynamically == true) {
      reminderDate = toDoListForm.get('reminderDate').value;
    }
    this.UserService.createToDoList(name, creationDate, isReminder, categorie, status, isPublic, reminderDate);
  }


  get f(): any {
    return this.toDoListForm.controls;
  }
  showReminderDate() {
    this.addReminderDateDynamically = true;
  }

  hideRemiderDate() {
    this.addReminderDateDynamically = false;
  }

  cancleCreation() {
    this.route.navigate(['/todolist'])
  }

}
