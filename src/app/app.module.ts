import { NgModule } from '@angular/core';
import { MaterialModule, MdToolbarModule, MdSidenavModule } from '@angular/material';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule }  from '@angular/http';
import { AppComponent } from './app.component';
import { ChangelogDialog } from './changelog-dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule.forRoot(),
    MdToolbarModule.forRoot(),
    MdSidenavModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ChangelogDialog,
  ],
  entryComponents: [
    ChangelogDialog,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
