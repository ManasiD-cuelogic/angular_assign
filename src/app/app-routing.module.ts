import { NgModule } from "@angular/core";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { AuthGuard, AuthGuardForLoggedInUser } from "./auth-guard/auth-guard.guard";
import { UserProfileShowComponent } from "./profile/user-profile/user-profile-show/user-profile-show.component";
import { UserProfileUpdateComponent } from "./profile/user-profile/user-profile-update/user-profile-update.component";
import { UserProfileComponent } from "./profile/user-profile/user-profile.component";
import { ResolverGuardService } from "./services/resolver-gaurd.service";
import { ResolverGuardCheckToDoListService } from "./services/resolver-guard-check-todolist.service";
import { AccessDeniedComponent } from "./shared/access-denied/access-denied.component";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";
import { TodolistCreateComponent } from "./todoapp/todolist/todolist-create/todolist-create.component";
import { TodolistDeleteComponent } from "./todoapp/todolist/todolist-delete/todolist-delete.component";
import { TodolistShowComponent } from "./todoapp/todolist/todolist-show/todolist-show.component";
import { TodolistUpdateSpecificComponent } from "./todoapp/todolist/todolist-update/todolist-update-specific/todolist-update-specific.component";
import { TodolistUpdateComponent } from "./todoapp/todolist/todolist-update/todolist-update.component";
import { TodolistComponent } from "./todoapp/todolist/todolist.component";
import { LoginComponent } from "./user-registration/login/login.component";
import { LogoutComponent } from "./user-registration/logout/logout.component";
import { RegisterComponent } from "./user-registration/register/register.component";

export const routingConfiguration: ExtraOptions = {
    paramsInheritanceStrategy: 'always'
  };

  const routes: Routes = [
    {
      path:'',
      redirectTo:'/login-user',
      pathMatch:'full',
      canActivate:[AuthGuardForLoggedInUser]
    },
    {
      path:'registration',
      component:RegisterComponent,
      canActivate:[AuthGuardForLoggedInUser]
    },
    {
      path:'login-user',
      component:LoginComponent,
      canActivate:[AuthGuardForLoggedInUser]
    },
    {
      path:'logout-user',
      component:LogoutComponent,
      canActivate: [AuthGuard],
    },
    {
      path:'user-profile',
      component:UserProfileComponent,
      canActivate: [AuthGuard],
      children:[
        {
          path:'',
          component:UserProfileShowComponent,
          pathMatch:'full'
        },
        {
          path:'user-profile-update/:field',
          component:UserProfileUpdateComponent,
        }
      ]
    },
    {
      path:'todolist',
      component:TodolistComponent,
      canActivate: [AuthGuard],
      children:[
        {
          path:'',
          component:TodolistShowComponent,
          pathMatch:'full'
        },
        {
          path:'create-todolist',
          component:TodolistCreateComponent,
        },
        {
          path:'update-todolist/:name',
          component:TodolistUpdateComponent,
          resolve: { name: ResolverGuardService },
          children:[
            {
              path:"update-item/:field",
              component:TodolistUpdateSpecificComponent,
              resolve:{ field: ResolverGuardCheckToDoListService}
            }
          ]
        },
        {
          path:'delete-todolist/:name',
          component:TodolistDeleteComponent,
          resolve: { name: ResolverGuardService }
        }
      ]
    },
    {
      path:'no-access',
      component:AccessDeniedComponent
    },
    {
      path:'**',
      component:PageNotFoundComponent,
      pathMatch: 'full'
    }
  
  ];
  
  
  
@NgModule({
    imports: [RouterModule.forRoot(routes,routingConfiguration)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}