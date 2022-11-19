import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private SERVER_URL = "http://localhost:3000/set-user-data";

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) { 
    console.log("handle error");
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public post(body: String){  
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
    'Content-Type':  'application/json', 
  })
    };
    return this.httpClient.post(this.SERVER_URL, body, httpOptions).pipe(catchError(this.handleError));  
  }  

}

