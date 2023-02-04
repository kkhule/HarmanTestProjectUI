import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppHttpInterceptorService implements HttpInterceptor {

constructor() { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  return next.handle(req)
     .pipe(
        retry(0),
        catchError(this.handleError),
        finalize(() => {  
        }

        )
     )

}

handleError(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error instanceof HttpErrorResponse) {
     if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
        return throwError(() => new Error(errorMessage));
     }

     else {
        switch (error.status) {
           case 400:
              {
                 errorMessage = 'Bad Request';
                 return throwError(() => new Error(errorMessage));
              }
           case 401:
           case 403:
           case 404:
              {
                 errorMessage = `Error: ${error.error}`;
                 return throwError(() => new Error(errorMessage));
              }

           case 500:
              {
                 errorMessage = `Error: ${error.error}`;
                 return throwError(() => new Error(errorMessage));
              }

           default:
              {
                 errorMessage = `Error: ${error.error}`;
                 return throwError(() => new Error(errorMessage));
              }

        }
     }
  }
  else {
     errorMessage = "some unknown error has occured";
     return throwError(() => new Error(errorMessage));
  }

}

}
