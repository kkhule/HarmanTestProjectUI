import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-checkbox-renderer',
  templateUrl: './checkbox-renderer.component.html',
  styleUrls: ['./checkbox-renderer.component.css']
})
export class CheckboxRendererComponent implements ICellRendererAngularComp, OnInit {

  public params: any;

  constructor() { }

  ngOnInit() {
  }

  refresh(params: any): boolean {
    throw new Error('Method not implemented.');
  }

  agInit(params: any): void {
    this.params = params;
  }

  checkedHandler(event: any) {
    let checked = event.target.checked;
    let colId = this.params.column.colId;
    this.params.node.setDataValue(colId, checked);
  }
 

}
