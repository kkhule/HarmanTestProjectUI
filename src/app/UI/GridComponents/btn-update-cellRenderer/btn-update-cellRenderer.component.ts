import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GlobalEventService } from 'src/app/services/GlobalEvent.service';

@Component({
  selector: 'app-btn-update-cellrenderer',
  templateUrl: './btn-update-cellRenderer.component.html',
  styleUrls: ['./btn-update-cellRenderer.component.css']
})
export class BtnUpdateICellRendererComponent implements ICellRendererAngularComp, OnInit {

  private params: any;

  constructor(private globalEvent$: GlobalEventService) { }

  ngOnInit() {
  }

  refresh(params: any): boolean {
    throw new Error('Method not implemented.');
  }

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler(data: any) {
    let selectedNode = this.params.node;
    let selectedData = selectedNode.data;
    console.log(selectedData);
    //this.params.api.updateRowData({remove: selectedData})
    let response = [false, selectedData]
    this.globalEvent$.gridNotification.next(response);
  }

}
