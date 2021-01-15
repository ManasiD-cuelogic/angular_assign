import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
    declarations:[
        LoginComponent,
        LogoutComponent,
        RegisterComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports:[
        LoginComponent,
        LogoutComponent,
        RegisterComponent
    ]
})
export class UserRegistrationModule{

}