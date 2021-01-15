import { Injectable, EventEmitter, Output } from '@angular/core';

import { Router} from '@angular/router';
import { stringify } from 'querystring';
import { ToDoList, User } from '../user.module';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  data: string | ArrayBuffer;
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private route:Router) { }

  updatingUserInterface(email,fname,lname,gender,address,password,fileObj){
    let user:User;
    user = {
      email:email,
      fname:fname,
      lname:lname,
      gender:gender,
      address:address,
      password:password,
      todoList:[],
      profilePic: fileObj
    }

    return user;
  }

  savingNewUserInLocalStorage(user,email){
      //checking if user is already registered then 
      if(localStorage.getItem(email) == null){
        localStorage.setItem(user.email, JSON.stringify(user));
        this.route.navigate(['/login-user'])
      }
  }

  registerNewUser<User>(email,fname,lname,gender,address,password,fileObj):boolean{
    let user;
    let fileReader = new FileReader();
    if(fileObj === undefined){
      fileObj = '';
      user = this.updatingUserInterface(email,fname,lname,gender,address,password,fileObj)
      this.savingNewUserInLocalStorage(user,email);

    }else{
      fileReader.readAsDataURL(fileObj[0])
      fileReader.onload = ()=> {
        user = this.updatingUserInterface(email,fname,lname,gender,address,password,fileReader.result)
        
        this.savingNewUserInLocalStorage(user,email);
        
      }
    }
    
    
    //if user exists in registered
    if(localStorage.getItem(email) != null){
      return false;
    }
  
  }

  clearUserSession(){
    sessionStorage.clear();
    this.getLoggedInName.emit(false);
    this.route.navigate(['/login-user'])
  }

  loginUser(emailId,password):boolean{
    if(localStorage.getItem(emailId) !== null){
      const userStorage = JSON.parse(localStorage.getItem(emailId));
      if(userStorage.password == password){
        sessionStorage.setItem("email", emailId);
        this.getLoggedInName.emit(true);
        this.route.navigate(['/todolist'])
      }else{
          return false; //password is incorrect
      }
    }else{
      return true; //user does not exists
    }
  }

  userProfileView():User{
    //console.log(JSON.parse(localStorage.getItem(sessionStorage.getItem('email'))))
    return JSON.parse(localStorage.getItem(sessionStorage.getItem('email')));
  }

  currentLoggedInUser(){
    return sessionStorage.getItem('email');
  }

  updatingUserProfileWithSwitchCaseField(userProfileContent,updatedField,field){
    userProfileContent[field] = updatedField
    localStorage.setItem(userProfileContent.email, JSON.stringify(userProfileContent));
    this.route.navigate(['/user-profile'])
  }

  updateUserProfile(updatedField,field){
    let userProfileContent = this.userProfileView()
    switch(field){
      case 'fname':
          this.updatingUserProfileWithSwitchCaseField(userProfileContent,updatedField,'fname');
          break;
      
      case 'lname':
          this.updatingUserProfileWithSwitchCaseField(userProfileContent,updatedField,'lname');
          break;

      case 'gender':
          this.updatingUserProfileWithSwitchCaseField(userProfileContent,updatedField,'gender');
          break;
      
      case 'address':
          this.updatingUserProfileWithSwitchCaseField(userProfileContent,updatedField,'address');
          break;

      case 'profilePic':
        let fileReader = new FileReader();
        fileReader.readAsDataURL(updatedField[0])
        fileReader.onload = ()=> {
          this.updatingUserProfileWithSwitchCaseField(userProfileContent,fileReader.result,'profilePic');
        }
        break;
    }
    
  }

  updatingToDoListInterface<TodoList>(name,creationDate,isReminder,categorie,status,isPublic,reminderDate){
    let usersToDoList:ToDoList = {
                          name:name,
                          creationDate:creationDate,
                          isReminder:isReminder,
                          categorie:categorie,
                          status:status,
                          isPublic:isPublic,
                          reminderDate:reminderDate
                        }
    return usersToDoList;
  }


  createToDoList<ToDoList>(name,creationDate,isReminder,categorie,status,isPublic,reminderDate){
      let currentLoginUser = this.userProfileView();
      const usersToDoList = this.updatingToDoListInterface(name,creationDate,isReminder,categorie,status,isPublic,reminderDate);
      currentLoginUser.todoList.push(usersToDoList);
      localStorage.setItem(this.currentLoggedInUser(), JSON.stringify(currentLoginUser));
      this.route.navigate(['/todolist']);
  }


  viewToDoList(){
    let currentLoginUser = this.userProfileView();
    return currentLoginUser.todoList;
  }

  toDoListToUpdateTheContent(nameOfToDoList){
      const toDoList =this.viewToDoList();
      const filteredToDoList = toDoList.filter((item) => item.name === nameOfToDoList);
      if(filteredToDoList.length != 0){
        return filteredToDoList[0];
      }else{
        this.route.navigate(['/todolist']);
      }
  }

  //resolver guard for delete
  toDoListNameParamResolver(nameParam){
    let currentLoginUser = this.userProfileView();
    const todoList = currentLoginUser.todoList;
    let flagToCheckNameParamIsThereInList:boolean=false;
    for(let list of todoList){
        if(list.name === nameParam){
          flagToCheckNameParamIsThereInList = true;
          break;
        }else{
          continue;
        }
    }
    if(flagToCheckNameParamIsThereInList == false){
        return false;
    }else if(flagToCheckNameParamIsThereInList == true){
        return true;
    }
  }


  //resolver guard for checking if field is part of todlist or not
  toDoListFieldParamResolver(fieldParam){
    if(
        fieldParam == 'creationDate' ||
        fieldParam == 'reminderDate' ||
        fieldParam == 'categorie' || 
        fieldParam == 'status' ||
        fieldParam == 'isPublic'
      ){
        return true;
      }else{
        return false;
      }
  }

  deleteSingleToDoList(nameOfToDoList:string){
    let currentLoginUser = this.userProfileView();
    const todoListToUpdate = currentLoginUser.todoList;  //todolist of current logged in user

    const filteredToDoList = todoListToUpdate.filter((item) => item.name !== nameOfToDoList);

    currentLoginUser.todoList = filteredToDoList

    const deleteConfirmation:boolean = confirm("Do you really want to delete " + nameOfToDoList + " list?")

    if(deleteConfirmation == true){
      localStorage.setItem(this.currentLoggedInUser(), JSON.stringify(currentLoginUser));
    }
    this.route.navigate(['/todolist']);

  }

  updateToDoListHelper(currentLoginUser,listToBeUpdated, filteredToDoList,fieldToUpdate,field,nameOfTodoList,isReminder?:string){
    if(isReminder === 'yes' || isReminder == 'no'){
      listToBeUpdated[field] = fieldToUpdate;
      listToBeUpdated['isReminder'] = isReminder;
    }
    listToBeUpdated[field] = fieldToUpdate;
    filteredToDoList.push(listToBeUpdated)

    currentLoginUser.todlist = filteredToDoList;

    const updateConfirmation:boolean = confirm("Do you really want to update?")

    if(updateConfirmation == true){
      localStorage.setItem(this.currentLoggedInUser(), JSON.stringify(currentLoginUser));
      this.route.navigate(['/todolist'])
    }else{
      this.route.navigate(['/todolist/update-todolist',nameOfTodoList])
    }
  }

  updateTodoList(fieldToUpdate,field,fieldReminderDate,nameOfTodoList){
    let currentLoginUser = this.userProfileView()
    const toDoList = currentLoginUser.todoList;

    let filteredToDoList = toDoList.filter((item) => item.name !== nameOfTodoList);

    let listToBeUpdated = toDoList.filter((item) => item.name === nameOfTodoList);

    switch(field){
      case 'creationDate':
        //console.log('creation date')
        this.updateToDoListHelper(currentLoginUser,listToBeUpdated[0],filteredToDoList,fieldToUpdate,field,nameOfTodoList)
        break;
      case 'status':
        //console.log('status')
        this.updateToDoListHelper(currentLoginUser,listToBeUpdated[0],filteredToDoList,fieldToUpdate,field,nameOfTodoList)
        break;
      case 'isPublic':
        //console.log('isPublic')
        this.updateToDoListHelper(currentLoginUser,listToBeUpdated[0],filteredToDoList,fieldToUpdate,field,nameOfTodoList)
        break
      case 'categorie':
        //console.log('categorie')
        this.updateToDoListHelper(currentLoginUser,listToBeUpdated[0],filteredToDoList,fieldToUpdate,field,nameOfTodoList)
        break;
      case 'reminderDate':
        if(fieldToUpdate == 'NA'){
         // console.log('update isReminder to no and reminder date to na')
          this.updateToDoListHelper(currentLoginUser,listToBeUpdated[0],filteredToDoList,fieldToUpdate,field,nameOfTodoList,'no',)
        }else{
          //console.log('update isReminder date to yes and reminder date to date')
          this.updateToDoListHelper(currentLoginUser,listToBeUpdated[0],filteredToDoList,fieldToUpdate,field,nameOfTodoList,'yes')
        }
        break;
    }
  }


  deleteMultipleTodoListsOnSelection(listOfMultipleToDoListToBeDeleted){
    let currentLoginUser = this.userProfileView();
    const todoListToUpdate = currentLoginUser.todoList;  //todolist of current logged in user
    
     for(let names of listOfMultipleToDoListToBeDeleted){
      for(let item of todoListToUpdate){
        if(item.name === names){
          todoListToUpdate.splice(todoListToUpdate.indexOf(item),1)
          break;
        }
      }
     }

    currentLoginUser.todoList = todoListToUpdate


    localStorage.setItem(this.currentLoggedInUser(), JSON.stringify(currentLoginUser));
      //this.route.navigate(['/todolist'])

  }
  
  checkingDuplicateListName(nameOfList){
    let currentLoginUser = this.userProfileView();
    const todoListToUpdate = currentLoginUser.todoList;
    let duplicateCheckFlag:boolean = false;
    for(let item of todoListToUpdate){
      if(item.name.toLowerCase() == nameOfList.toLowerCase()){
        duplicateCheckFlag = true;
        break;
      }
    }
    if(duplicateCheckFlag == true){
      return true;
    }else{
      return false;
    }

  }
  
  returnToDoList(listOfMultipleToDoListToBeDeleted){
    let currentLoginUser = this.userProfileView();
    const todoListToUpdate = currentLoginUser.todoList;
    for(let item of todoListToUpdate){
        if(listOfMultipleToDoListToBeDeleted.indexOf(item.name) === -1){
          listOfMultipleToDoListToBeDeleted.push(item.name);
        }
    }
  
    return listOfMultipleToDoListToBeDeleted;
  }

}