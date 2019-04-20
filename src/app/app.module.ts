import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';

import {Logger} from '../common/logger';

import {DefaultRequestProcessedHandler} from "../common/http/handler/default-handler/DefaultRequestProcessedHandler";
import {XyHttpInterceptor} from "../common/http/interceptor/interceptor";
import {RequestProcessedHandler} from "../common/http/handler/RequestProcessedHandler";
import {RequestPreviewHandler} from "../common/http/handler/RequestPreviewHandler";
import {DefaultRequestPreviewHandler} from "../common/http/handler/default-handler/DefaultRequestPreviewHandler";
import {RequestExceptionHandler} from "../common/http/handler/RequestExceptionHandler";
import {DefaultRequestExceptionHandler} from "../common/http/handler/default-handler/DefaultRequestExceptionHandler";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpProvider } from 'src/common/http/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    Logger,
    {provide: RequestPreviewHandler, useClass: DefaultRequestPreviewHandler},
    {provide: RequestProcessedHandler, useClass: DefaultRequestProcessedHandler},
    {provide: RequestExceptionHandler, useClass: DefaultRequestExceptionHandler},
    {provide: HTTP_INTERCEPTORS, useClass: XyHttpInterceptor, multi: true},
    HttpProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}