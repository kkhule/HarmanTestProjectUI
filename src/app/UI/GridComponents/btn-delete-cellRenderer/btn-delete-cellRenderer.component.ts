
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalEventService } from 'src/app/services/GlobalEvent.service';


@Component({
  selector: 'app-btn-delete-cellrenderer',
  templateUrl: './btn-delete-cellRenderer.component.html',
  styleUrls: ['./btn-delete-cellRenderer.component.css']
})
export class BtnDeleteCellRendererComponent implements ICellRendererAngularComp, OnInit {

  private params: any;

  constructor(private globalEvent$: GlobalEventService) { }

  refresh(params: any): boolean {
    throw new Error('Method not implemented.');
  }

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler(data: any) {
    //let selectedData = this.params.api.getSelectedRows();
    let selectedNode = this.params.node;
    let selectedData = selectedNode.data;
    console.log(selectedData);
    //this.params.api.updateRowData({remove: selectedData})
    this.alertConfirmation(true,selectedData)
    
  }

  alertConfirmation(isDelete:boolean, deletedRow:any)  {
    Swal.fire({
      title: 'Are you sure want to remove?',
      //text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        let response = [isDelete, deletedRow]
        this.globalEvent$.gridNotification.next(response);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  ngOnInit() {
  }

}
