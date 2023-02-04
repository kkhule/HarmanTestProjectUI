import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private localUrl = environment.API_URL + 'product';

  constructor(private http: HttpClient) {

  }

  getallProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.localUrl);
  }

  updateProduct(product: Product): Observable<HttpResponse<any>> {
    //let htttParams = new HttpParams().set("userId", product);
    //let options = { params: htttParams };
    return this.http.put<HttpResponse<any>>(this.localUrl, product, { observe: 'response' });
  }

  addProduct(product: Product): Observable<Product> {

     let header= new HttpHeaders().set('Content-Type', 'application/json');
     const requestOptions = { headers: header };
    return this.http.post<Product>(this.localUrl, product,requestOptions);
  }

  deleteProduct(id: number): Observable<HttpResponse<any>> {
    //let htttParams = new HttpParams().set("id", id);
    //let options = { params: htttParams };
    let url= this.localUrl +'/'+ id;
    return this.http.delete<HttpResponse<any>>(url,  { observe: 'response' });
  }

}
