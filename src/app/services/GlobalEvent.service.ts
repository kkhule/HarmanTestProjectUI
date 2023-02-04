import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalEventService {

  gridNotification = new Subject<any>();

  constructor() { }

}
