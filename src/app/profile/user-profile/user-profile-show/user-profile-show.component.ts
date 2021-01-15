import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/user.module';

@Component({
  selector: 'app-user-profile-show',
  templateUrl: './user-profile-show.component.html',
  styleUrls: ['./user-profile-show.component.css']
})
export class UserProfileShowComponent implements OnInit {
user: User;
profilPic:string|ArrayBuffer;
  constructor(private UserService:UserService) { }

  ngOnInit(): void {
    this.user = this.UserService.userProfileView();
    if(this.user.profilePic == ""){
      this.profilPic = "../../assets/user_avatar.png";
    }else{
      this.profilPic = this.user.profilePic;
    }
  }

}
