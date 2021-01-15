import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { TodolistCreateComponent } from "./todolist/todolist-create/todolist-create.component";
import { TodolistDeleteComponent } from "./todolist/todolist-delete/todolist-delete.component";
import { TodolistShowComponent } from "./todolist/todolist-show/todolist-show.component";
import { TodolistUpdateSpecificComponent } from "./todolist/todolist-update/todolist-update-specific/todolist-update-specific.component";
import { TodolistUpdateComponent } from "./todolist/todolist-update/todolist-update.component";
import { TodolistComponent } from "./todolist/todolist.component";

@NgModule({
    declarations:[
        TodolistComponent,
        TodolistCreateComponent,
        TodolistUpdateComponent,
        TodolistDeleteComponent,
        TodolistShowComponent,
        TodolistUpdateSpecificComponent
    ],
    imports:[
        CommonModule,
        SharedModule
    ],
    exports:[
        TodolistComponent,
        TodolistCreateComponent,
        TodolistUpdateComponent,
        TodolistDeleteComponent,
        TodolistShowComponent,
        TodolistUpdateSpecificComponent
    ]
})
export class ToDoAppModule{

}