/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Product } from '../models/product';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

export const mockProduct: Product = {
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
}

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
const mockResponse = { status: 204, statusText: 'No Content' };

describe('Product Service', () => {
  let httpTestingController: HttpTestingController;
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ProductService);
  });

  it('should ...', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));

  it('getallProducts should return all products', () => {
    service.getallProducts().subscribe((product: any) => {
      expect(product).not.toBe(null);
      expect(JSON.stringify(product)).toEqual(JSON.stringify(mockProducts));
    });

    const req = httpTestingController
      .expectOne(`http://localhost:5000/api/product`);

    req.flush(mockProducts);
  });

  it('addProduct should return product', () => {
    service.addProduct(mockProduct).subscribe((product: any) => {
      expect(product).not.toBe(null);
      expect(JSON.stringify(product)).toEqual(JSON.stringify(mockProduct));
    });

    const req = httpTestingController
      .expectOne(`http://localhost:5000/api/product`);

    req.flush(mockProduct);
  });

  it('updateProduct should return 204 status code', () => {
    service.updateProduct(mockProduct).subscribe((response: any) => {
      //expect(response).toBe(null);
      expect(response.status).toEqual(204);
    });

    const req = httpTestingController
      .expectOne(`http://localhost:5000/api/product`);

    req.flush(mockResponse);
  });

  it('deleteOrder should return 204 status code', () => {
    service.deleteProduct(1).subscribe((response: any) => {
      //expect(response).toBe(null);
      expect(response.status).toEqual(204);
    });

    const req = httpTestingController
      .expectOne(`http://localhost:5000/api/product/1`);

    req.flush(mockResponse);
  });
});
