import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileUpdateComponent } from './user-profile/user-profile-update/user-profile-update.component';
import { UserProfileShowComponent } from './user-profile/user-profile-show/user-profile-show.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UserProfileComponent,
    UserProfileUpdateComponent,
    UserProfileShowComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[    
    UserProfileComponent,
    UserProfileUpdateComponent,
    UserProfileShowComponent]
})
export class ProfileModule { }