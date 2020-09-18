import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgObjectPipesModule } from 'ngx-pipes';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxDropzoneModule,
    NgObjectPipesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
