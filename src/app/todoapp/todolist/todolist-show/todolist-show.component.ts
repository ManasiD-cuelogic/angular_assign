import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-todolist-show',
  templateUrl: './todolist-show.component.html',
  styleUrls: ['./todolist-show.component.css']
})
export class TodolistShowComponent implements OnInit {
  todoList:any[];
  filteredStatus ='';
  sortFieldName:string='';
  toDoListEmptyFlag:boolean;
  listTobeDeletedArray:any[]=[];
  mySubscription:any;

 
  addingMultipleSelectDeleteButton:boolean=false;
  checkboxSelector:boolean=false;

  constructor(private UserService:UserService,
    private _router: Router,
    public dialog: MatDialog) { 
      this._router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.mySubscription = this._router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this._router.navigated = false;
        }
      });
    }

  ngOnInit(): void {
    this.todoList = this.UserService.viewToDoList();
    if(this.todoList.length == 0){
      this.toDoListEmptyFlag = false;
    }else{
      this.toDoListEmptyFlag = true;
    }
  }

  sortTable(sortFieldName){
    this.sortFieldName = sortFieldName
  }

  checkbox(nameOfToDoListsToBeDeleted,checkedStatus){
    if(this.listTobeDeletedArray.find(item => item === nameOfToDoListsToBeDeleted)){
      this.listTobeDeletedArray.splice(this.listTobeDeletedArray.indexOf(nameOfToDoListsToBeDeleted),1)
    }else{
      this.listTobeDeletedArray.push(nameOfToDoListsToBeDeleted);
    }

    if(this.listTobeDeletedArray.length == 0){
      this.addingMultipleSelectDeleteButton = false;
    }else{
      this.addingMultipleSelectDeleteButton=true;
    }
    console.log(this.listTobeDeletedArray)
  }


  selectAllCheckboxForDeletion(checkedStatus){
    if(this.checkboxSelector == false){
      this.listTobeDeletedArray = this.UserService.returnToDoList(this.listTobeDeletedArray);
      this.checkboxSelector=true;

    }else{
      this.listTobeDeletedArray = [];
      this.checkboxSelector=false;
    }
    console.log(this.listTobeDeletedArray)

    if(this.listTobeDeletedArray.length == 0){
      this.addingMultipleSelectDeleteButton = false;
    }else{
      this.addingMultipleSelectDeleteButton=true;
    }
  }

  deleteMultipleToDoList(){
    if(this.listTobeDeletedArray.length == 0){
      alert("Please select a task to delete")
    }else{
      const deleteConfirmation:boolean = confirm("Do you really want to delete multiple lists?")
      if(deleteConfirmation == true){
        this.UserService.deleteMultipleTodoListsOnSelection(this.listTobeDeletedArray);
      }
        this._router.navigate(['/todolist'])
    }

  }


  changeInput:boolean=false;

  changeToInputBox(){
    if(this.changeInput === false){
      this.changeInput = true;
    }else{
      this.changeInput = false;
    }
    
  }



disableDeleteButtonFlag:boolean;
disableDeleteButton(){
  this.disableDeleteButtonFlag=true;
}

enableDeleteButton(){
  this.disableDeleteButtonFlag=false;
}

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

}
