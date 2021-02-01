import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private route: Router,
    private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.databaseService.clearUserSession()
  }

}
