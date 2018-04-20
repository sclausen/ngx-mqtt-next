import { Input, Directive, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { MqttService, MqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs-compat/Subscription';

@Directive({
  selector: '[appMqttFilter]'
})
export class MqttDirective implements OnInit, OnDestroy {
  @Input()
  public mqttFilter: string;

  private subscription: Subscription;

  constructor(private _mqtt: MqttService, private el: ElementRef) {
    this.el.nativeElement.innerHTML = '<strong>No Payload</strong>';
  }

  public ngOnInit() {
    this.subscription = this
      ._mqtt
      .observe(this.mqttFilter)
      .subscribe((message: MqttMessage) => {
        this.el.nativeElement.innerHTML = message.payload.toString();
      });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
