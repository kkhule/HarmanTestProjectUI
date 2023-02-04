import { GlobalEventService } from './../../services/GlobalEvent.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, tap, of } from 'rxjs';
import { Product } from 'src/app/models/product';
import { BtnDeleteCellRendererComponent } from '../GridComponents/btn-delete-cellRenderer/btn-delete-cellRenderer.component'; 
import { BtnUpdateICellRendererComponent } from '../GridComponents/btn-update-cellRenderer/btn-update-cellRenderer.component';
import { CheckboxRendererComponent } from '../GridComponents/checkbox-renderer/checkbox-renderer.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from '../add-product/add-product.component';
import { HttpStatusCode } from '@angular/common/http';


@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit,OnDestroy {


  rowData$: Observable<any> ;
  columnDefs$: any;
  gridApi: any;
  columnApi: any;
  quickFilterValue = '';

  constructor(private productService$: ProductService, private modal$: NgbModal, private globalEvent$: GlobalEventService) {
  }


  AddRecord() {
    this.onOpenAddEditRecordDialog(true, null);
  }

  onOpenAddEditRecordDialog(isnew: boolean, product: any) {
    const modelRef = this.modal$.open(AddProductComponent, { centered: true, windowClass: 'app-modal-window', ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    modelRef.componentInstance.isNewProduct = isnew;
    modelRef.componentInstance.editProduct = product;
    modelRef.componentInstance.messageEvent.subscribe(this.addRecordModalCallBack)
  }

  public addRecordModalCallBack: (response: any) => void = (response) => {

    if (response != null) {
      
      let isAdd = response[0];
      let product = response[1];
      if (isAdd) 
      {

          //this.gridApi.applyTransaction({ add: [product]});

           this.productService$.addProduct(product).subscribe(
          {
            next: (resp: Product) => {
              if(resp!=null )
              {
                  this.gridApi.applyTransaction({add: [resp] }) 
                
              };
                  
            },
            error: e => {
            },
            complete() { }
          }
        );
         
        }
      
      else 
      {
        //var rowNode = this.gridApi.getRowNode(product.id);
        this.productService$.updateProduct(product).subscribe(
          {
             next: (resp: any ) => {
              
                 //this.gridApi.applyTransaction({ remove: [this.gridApi.api.getRowNode(product.id).data] });
                 if( (resp != null) && (resp.status = HttpStatusCode.NoContent) )
                      this.loadGridData();
            },
            error: e => {
            },
             complete() { 

             }
          }
        );
        
    }
   }
  }

  deleteRecord(product: any) {
    
    this.productService$.deleteProduct(product.id).subscribe(
      {
        next: (resp: any) => {
          
          if( (resp !=null) && (resp.status = HttpStatusCode.NoContent) )
          {
              this.gridApi.applyTransaction({ remove: [product] });
          }
        },
        error: e => {
          
        },
        complete() { }
      }
    );
    
  }

  updateGridRow() {
    this.globalEvent$.gridNotification.subscribe(response => {
      if (response != null) {
        let isDeleted = response[0];
        let product = response[1];
        if (isDeleted) {
          this.deleteRecord(product);
        }
        else {
          this.onOpenAddEditRecordDialog(false, product);
        }
      }
    })
  }

  ngOnInit() {
    this.initAgGrid();
    this.loadGridData();
    this.updateGridRow()
    
  }

   ngOnDestroy(): void {
    this.globalEvent$.gridNotification.unsubscribe();
   }
  

  loadGridData() {
    this.rowData$ = this.productService$.getallProducts();
  }

  initAgGrid() {
    this.columnDefs$ = [
      { headerName: 'ID', field: 'id',  sortable: true, filter: true },
      { headerName: 'Name', field: 'name', sortable: true, filter: true },
      { headerName: 'Category Name', field: 'categoryName', sortable: true, filter: true },
      { headerName: 'Description', field: 'description', sortable: true, filter: true },
      { headerName: 'Image Url', field: 'imageurl', sortable: true, filter: true },
      { headerName: 'Unit Type', field: 'unitType', sortable: true, filter: true },
      { headerName: 'Price', field: 'price', sortable: true, filter: true },
      {
        headerName: 'IsActive', field: 'isActive', sortable: true, filter: true, editable: false,

        cellRendererFramework: CheckboxRendererComponent,
      },
      { headerName: 'Created', field: 'createdDate', minWidth: 150, sortable: true, filter: true, cellRenderer: (data: any) => { return data.value ? new Date(data.value).toLocaleDateString() : ''; } },
      { headerName: 'Last Updated', field: 'lastUpdateDate', sortable: true, filter: true, cellRenderer: (data: any) => { return data.value ? new Date(data.value).toLocaleDateString() : ''; } },
      {
        headerName: 'Update',
        field: "Update",
        cellRendererFramework: BtnUpdateICellRendererComponent,
        minWidth: 150
      },
      {
        headerName: 'Delete',
        field: "Delete",
         
        cellRendererFramework: BtnDeleteCellRendererComponent,
        minWidth: 150
      }
    ];


  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    //this.columnApi.autoSizeAllColumns();
    this.gridApi.sizeColumnsToFit(); 
  }

  onQuickFilterInput(e: any) {
    this.gridApi.setQuickFilter(e.target.value);
  }

}
