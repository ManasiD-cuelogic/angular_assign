import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverGuardCheckToDoListService implements Resolve<any> {
  constructor(private UserService:UserService) {}
  resolve(route: ActivatedRouteSnapshot) {
    return this.UserService.toDoListFieldParamResolver(route.params.field);
  }
}