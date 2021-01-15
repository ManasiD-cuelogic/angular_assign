import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from "../app-routing.module";
import { AccessDeniedComponent } from "./access-denied/access-denied.component";
import { FilterPipe } from "./custom-pipes/filter.pipe";
import { SortPipe } from "./custom-pipes/sort.pipe";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

@NgModule({
    declarations: [
        AccessDeniedComponent,
        PageNotFoundComponent,
        FilterPipe,
        SortPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatCheckboxModule,
        MatButtonModule,
        MatTableModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatIconModule,
        MatDatepickerModule,
        MatRadioModule,
        MatDialogModule,
        AppRoutingModule
    ],
    exports: [
        AccessDeniedComponent,
        PageNotFoundComponent,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatCheckboxModule,
        MatButtonModule,
        MatTableModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatIconModule,
        MatDatepickerModule,
        MatRadioModule,
        MatDialogModule,
        FilterPipe,
        SortPipe,
        AppRoutingModule
    ]
})
export class SharedModule {

}