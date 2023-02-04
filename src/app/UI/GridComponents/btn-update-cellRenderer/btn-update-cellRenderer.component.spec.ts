/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnUpdateICellRendererComponent } from './btn-update-cellRenderer.component';

describe('BtnUpdateICellRendererComponent', () => {
  let component: BtnUpdateICellRendererComponent;
  let fixture: ComponentFixture<BtnUpdateICellRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnUpdateICellRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnUpdateICellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
