import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route:Router,private UserService:UserService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.UserService.currentLoggedInUser() != null){
      return true;
    }else{
      this.route.navigate(['no-access'])

    }
  }

}

  @Injectable({
    providedIn: 'root'
  })
  export class AuthGuardForLoggedInUser implements CanActivate {
  
    constructor(private route:Router,private UserService:UserService){}
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.UserService.currentLoggedInUser() == null){
        return true;
      }else{
        this.route.navigate(['/todolist'])
  
      }
    }
  
  }