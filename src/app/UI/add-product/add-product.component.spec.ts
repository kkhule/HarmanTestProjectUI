/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddProductComponent } from './add-product.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';


export const mockProduct: Product = {
  id:1,
  name:'Parle',
  categoryName:'Biscuit',
  description:'Crispy',
  unitType:'Qty',
  imageURL:'',
  price:10,
  isActive :true,
  createdDate: new Date(),
  lastUpdateDate: new Date()
}

export const mockIncorrectProduct: Product = {
  id:1,
  name:'',
  categoryName:'Biscuit',
  description:'Crispy',
  unitType:'Qty',
  imageURL:'',
  price:10,
  isActive :true,
  createdDate: new Date(),
  lastUpdateDate: new Date()
}

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductComponent ],
      providers: [
        NgbActiveModal,
        FormBuilder,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(AddProductComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    component.isNewProduct = true;
    fixture.detectChanges();
    //const componentCreated = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    component.isNewProduct = true;
    fixture.detectChanges();
    //let spyloadMyOrders = spyOn(component, "initForm").and.returnValue([]);
    component.ngOnInit();
    expect(component.productForm.invalid).toEqual(true);
  })

  it('Check edit value of Product Form', () =>  {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    component.isNewProduct = false;
    component.editProduct=mockProduct; 
    fixture.detectChanges();

    const productFormGroup = component.productForm;
    const loginFormValue  = {
      id:1,
      name:'Parle',
      categoryName:'Biscuit',
      description:'Crispy',
      unitType:'Qty',
      imageURL:'',
      price:10,
      isActive :true,
     }
      expect(productFormGroup.value).toEqual(loginFormValue);
   })

   it('Check Initial value of Product Form', () =>  {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    component.isNewProduct = true;
    fixture.detectChanges();

    //const productFormGroup = component.productForm;
    const loginFormValue  = {
          id:0,
          name:'',
          categoryName: '',
          description: '',
          imageURL: '',
          unitType: 'Qty',
          price: 0,
          isActive: true
     }
      expect(component.productForm.value).toEqual(loginFormValue);
   })

   it('should be Invalid if form value is invalid', () => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    component.isNewProduct = false;
    component.editProduct=mockIncorrectProduct; 
    fixture.detectChanges();

    expect(component.productForm.invalid).toEqual(true);
  });

  it('should be valid if form value is valid', () => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    component.isNewProduct = false;
    component.editProduct=mockProduct; 
    fixture.detectChanges();

    expect(component.productForm.valid).toEqual(true);
  });


  it('should not allow user to submit', () => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    component.isNewProduct = false;
    component.editProduct= mockIncorrectProduct
    fixture.detectChanges();

    expect(component.productForm.invalid).toEqual(true);
  });

});
