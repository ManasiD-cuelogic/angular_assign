import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-todolist-update',
  templateUrl: './todolist-update.component.html',
  styleUrls: ['./todolist-update.component.css']
})
export class TodolistUpdateComponent implements OnInit {
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private UserService: UserService) { }
    
    nameResolveParam: any;
    nameOfToDoList: string;
    todoList: any;
  ngOnInit(): void {
    this.nameResolveParam = this.route.snapshot.data['name'];
    if (this.nameResolveParam == false) {
      this.router.navigate(['/todolist']);
    } else if (this.nameResolveParam == true) {
      this.route.params.subscribe(params => {
        this.nameOfToDoList = params['name'];
        this.todoList = this.UserService.toDoListToUpdateTheContent(this.nameOfToDoList);
      })
    }
  }
  cancelUpdate() {
    this.router.navigate(['/todolist'])
  }

}
