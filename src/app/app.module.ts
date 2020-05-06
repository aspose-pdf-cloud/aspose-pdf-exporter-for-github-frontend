import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

import {
  MatButtonModule, 
  MatCardModule, 
  MatInputModule, 
  MatMenuModule,
  MatIconModule, 
  MatToolbarModule, 
  MatListModule, 
  MatGridListModule, 
  MatFormFieldModule, 
  MatSelectModule, 
  MatTableModule, 
  MatCheckboxModule, 
  MatPaginatorModule, 
  MatDatepickerModule, 
  MatNativeDateModule,
  MatDialogModule
} from '@angular/material';

import { AuthService } from './services/auth.service';
import { MainComponent } from './main/main.component';
import { CallbackComponent } from './callback/callback.component';
import { IssuesComponent } from './issues/issues.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.ts.pipe';
import { ErrorHandleDialogComponent } from './error-handle-dialog/error-handle-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RepositoriesComponent,
    MainComponent,
    CallbackComponent,
    IssuesComponent,
    SearchPipe,
    ErrorHandleDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService],
  entryComponents: [ErrorHandleDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
