import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {PdfViewerModule} from "ng2-pdf-viewer";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";
import {BackendService} from "./service/backend.service";
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        PdfViewerModule,
        BrowserAnimationsModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatSliderModule,
        FormsModule,
        HttpClientModule,
        MatIconModule
    ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
