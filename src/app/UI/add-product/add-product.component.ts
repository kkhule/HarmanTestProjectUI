import { Product } from './../../models/product';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  editProduct: Product;
  isNewProduct: boolean;
  title: string = 'Add';
  @Output() messageEvent = new EventEmitter<any>();

  public unitTypes: any = ['Qty', 'Weight', 'Package'];

  constructor(private actievModal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit() {
    
    if (this.isNewProduct) {
      this.title = "Add"
      this.initForm();
    }
    else {
      this.title = "Edit"
      this.setForm();
    }
  }

  setForm() {
    let prod = this.editProduct;

    this.productForm = this.fb.group({
      id:[prod.id],
      name: [prod.name, Validators.required],
      categoryName: [prod.categoryName, [Validators.required]],
      description: [prod.description, [Validators.required]],
      imageURL: [prod.imageURL],
      unitType: [prod.unitType, [Validators.required]],
      price: [prod.price, [Validators.required, Validators.pattern("^[0-9]*$")]],
      isActive: [prod.isActive],

    });

    // this.productForm.setValue({
    //   name: prod.name,
    //   categoryName: prod.categoryName,
    //   description: prod.description,
    //   imageURL: prod.imageURL,
    //   unitType: prod.unitType,
    //   price: prod.price,
    //   isActive: prod.isActive,
    // });
  }


  initForm() {
    this.productForm = this.fb.group({
      id:[0],
      name: ['', Validators.required],
      categoryName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageURL: [''],
      unitType: [this.unitTypes[0], [Validators.required]],
      price: [0, [Validators.required, Validators.pattern("^[0-9]*$")]],
      isActive: [true]
    });
  }

  get f() {
    return this.productForm.controls;
  }

  get unitType() {
    return this.productForm.get('unittype');
  }

  changeUnitType(e: any) {
    this.unitType?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  onSubmit(form: FormGroup) {

    if (form.valid) {
      
      let product = new Product(form.value);

      if (this.isNewProduct) {
        product.createdDate = new Date();
      }
      else {
        product.lastUpdateDate = new Date();
      }

      let response = [this.isNewProduct, product]
      this.messageEvent.emit(response);
      this.actievModal.close();
    }
    //console.log('Valid?', form.valid); // true or false
    // console.log('Name', form.value.name);
    //console.log('Email', form.value.email);
    //console.log('Message', form.value.message);
  }

  onClose() {
    this.actievModal.close();
  }

}

