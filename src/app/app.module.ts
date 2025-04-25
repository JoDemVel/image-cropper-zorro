import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ZorroModule } from './zorro.module';

import { ImageCropperModule } from 'ngx-image-cropper';

import { AppComponent } from './app.component';
import { ImageEditorComponent } from './features/image-editor/image-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ZorroModule,
    ImageCropperModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
