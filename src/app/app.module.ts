import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StateToClassPipe, StateToStringPipe } from './pipes';
import { MqttDirective } from './mqtt.directive';
import {
  MqttMessage,
  MqttModule,
  MqttService,
  MqttServiceOptions
} from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: MqttServiceOptions = {
  hostname: 'localhost',
  port: 9001,
  path: '/mqtt'
};

export function mqttServiceFactory() {
  return new MqttService(MQTT_SERVICE_OPTIONS);
}

@NgModule({
  declarations: [
    AppComponent,
    MqttDirective,
    StateToStringPipe,
    StateToClassPipe
  ],
  imports: [
    BrowserModule,
    MqttModule.forRoot({
      provide: MqttService,
      useFactory: mqttServiceFactory
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
