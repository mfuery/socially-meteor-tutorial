import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { PARTIES_DECLARATIONS } from './parties/index';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { routes, ROUTES_PROVIDERS } from './app.routes';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  // Modules
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AccountsModule
  ],
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    ...PARTIES_DECLARATIONS
  ],
  // Entry Components
  // entryComponents: [
  //   AppComponent
  // ],
  // Providers
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    ...ROUTES_PROVIDERS
  ],
  // Main Component
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor() {

  }
}
