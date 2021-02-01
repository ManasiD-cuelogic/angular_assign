import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../services/database.service';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  private sub:Subscription;

  currentLoggedInUserEmailId:string;
  currentLogedInUserFlag:boolean;

  constructor(private UserService:UserService,
    private elementRef:ElementRef,
    private databaseService: DatabaseService) {
      this.currentLoggedInUserEmailId=this.UserService.currentLoggedInUser()
    this.currentLogedInUserFlag = this.currentLoggedInUserEmailId ? true:false
    this.sub =this.databaseService.getLoggedInName.subscribe(loggedInFlag => {
      this.changeLogInStatus(loggedInFlag)
      console.log(loggedInFlag)
    });
     }
     private changeLogInStatus(loggedInFlag){
      this.currentLogedInUserFlag = loggedInFlag;
      
    }
  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'whitesmoke';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
}

}
