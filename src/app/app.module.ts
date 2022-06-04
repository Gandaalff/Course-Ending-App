import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from 'store';

// feature modules

// containers
import { AppComponent } from './containers/app/app.component';

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}

/*
const firebaseConfig = {
  apiKey: "AIzaSyC86P7KSmQNQXEbLs0q8qBUAVdk0KztOcU",
  authDomain: "ending-app-1833a.firebaseapp.com",
  databaseURL: "https://ending-app-1833a-default-rtdb.firebaseio.com",
  projectId: "ending-app-1833a",
  storageBucket: "ending-app-1833a.appspot.com",
  messagingSenderId: "232822833797",
  appId: "1:232822833797:web:f470ba2d524af2cf47dfec",
  measurementId: "G-3WF1EN50W4"
};
};
*/