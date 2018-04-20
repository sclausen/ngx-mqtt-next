import { Component } from '@angular/core';
import { MqttService } from 'ngx-mqtt';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h2><i class="fas fa-circle" [ngClass]="(state | async) | stateToClass"></i>
            {{(state | async) | stateToString}}</h2>
      <h3 appMqttFilter="$SYS/broker/uptime"></h3>
      <button type="button" class="btn btn-danger" (click)="disconnect()">Disconnect</button>
    </div>
  `
})
export class AppComponent {
  constructor(private _mqtt: MqttService) {}

  public get state() {
    return this._mqtt.state;
  }

  public disconnect() {
    this._mqtt.disconnect();
  }
}
