/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GlobalEventService } from './GlobalEvent.service';

describe('Service: GlobalEvent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalEventService]
    });
  });

  it('should create', inject([GlobalEventService], (service: GlobalEventService) => {
    expect(service).toBeTruthy();
  }));
});
