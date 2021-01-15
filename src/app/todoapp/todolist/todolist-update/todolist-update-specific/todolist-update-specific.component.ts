import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-todolist-update-specific',
  templateUrl: './todolist-update-specific.component.html',
  styleUrls: ['./todolist-update-specific.component.css']
})
export class TodolistUpdateSpecificComponent implements OnInit {
  addReminderDateDynamically: boolean;
  warningMessage: string;
  flashMessage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private UserService: UserService
  ) { }

  fieldResolveParam: any;
  fieldToUpdateInToDoList: string;
  todoList: any;
  updatedField: any;
  nameOfToDoList: string;
  isReminderFieldValue: string;
  updatedFieldForIsReminder: any;
  nameOfTodList: string;

  ngOnInit(): void {
    this.fieldResolveParam = this.route.snapshot.data['field'];
    if (this.fieldResolveParam == false) {
      this.router.navigate(['/todolist']);
    } else if (this.fieldResolveParam == true) {
      this.route.params.subscribe(params => {
        this.fieldToUpdateInToDoList = params['field'];
        this.nameOfTodList = this.route.snapshot.paramMap.get('name')
      })
    }

  }
  updateFields(updatedField, field, fieldReminderDate?) {


    if (updatedField === undefined && fieldReminderDate !== 'no') {
      //if updated filed is empty and if reminderdate is yes then show warning
      this.warningMessage = "Please fill the field " + field
      this.flashMessage = true;
      return;
    } else {
      let fieldToUpdate = updatedField;
      console.log(updatedField)
      console.log(field)
      console.log(fieldReminderDate)

      if (fieldReminderDate == 'no') {
        fieldToUpdate = 'NA'
      }

      this.UserService.updateTodoList(fieldToUpdate, field, fieldReminderDate, this.nameOfTodList)

    }


  }
  cancelUpdate() {
    this.router.navigate(['/todolist/update-todolist', this.nameOfTodList])
  }

  showReminderDate() {
    this.addReminderDateDynamically = true;
  }

  hideRemiderDate() {
    this.addReminderDateDynamically = false;
  }

}
