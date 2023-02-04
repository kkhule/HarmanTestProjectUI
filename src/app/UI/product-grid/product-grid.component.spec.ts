/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductGridComponent } from './product-grid.component';
import { GlobalEventService } from 'src/app/services/GlobalEvent.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from 'src/app/models/product';
import { Observable, of } from 'rxjs';


export const mockProducts: Product[] = [{
  id:1,
  name:'Parle',
  categoryName:'Biscuit',
  description:'',
  unitType:'',
  imageURL:'',
  price:10,
  isActive :true,
  createdDate: new Date(),
  lastUpdateDate: new Date()
},
{
  id:2,
  name:'GoodDay',
  categoryName:'Biscuit',
  description:'',
  unitType:'',
  imageURL:'',
  price:20,
  isActive :true,
  createdDate: new Date(),
  lastUpdateDate: new Date()
}

];

export const mock$: Observable<any> = of([mockProducts]);

describe('ProductGridComponent', () => {
  let component: ProductGridComponent;
  let fixture: ComponentFixture<ProductGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ ProductGridComponent ],
      providers: [
        GlobalEventService,
        NgbModal,
        ProductService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call ngOnInit', () => {
    //const fixture = TestBed.createComponent(PizzaOrderSummaryComponent);
    const component = fixture.debugElement.componentInstance;
    let spyloadMyOrders = spyOn(component, "loadGridData").and.returnValue([]);
    component.ngOnInit();
    component.rowData$ = spyloadMyOrders;
    expect(component.rowData$.length).toEqual(0);
  })


  it('should call loadGridData and get response as array', () => {
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(ProductService);
    let spyloadMyOrders = spyOn(service, "getallProducts").and.callFake(() => {
      return of(mockProducts);
    });
    component.rowData$ = mockProducts;
    expect(component.rowData$.length).toBeGreaterThan(0);
  });

  it('should call loadGridData and get response as empty array', () => {
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(ProductService);
    let spyloadMyOrders = spyOn(service, "getallProducts").and.callFake(() => {
      return of(mockProducts);
    });

    component.rowData$ = spyloadMyOrders;
    expect(component.rowData$.length).toEqual(0);
  });

});
