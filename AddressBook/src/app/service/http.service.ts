import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressBook } from '../model/address-book';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
 
  baseURL: string = "http://localhost:8080/addressBook/";
 
  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Purpose: Add Contact data to the database.
   */

  addContactDetails(data) : Observable<any> {
    console.log(data);
    return this.httpClient.post(this.baseURL + "addContactDetails", data);
  }

  /**
   * Purpose: Check Login user data with existin database loginDetails 
   */

  login(data) : Observable<any> {
    console.log(data);
    return this.httpClient.post(this.baseURL + "getUserDetails", data);
  }
 
  /**
   * Purpose: Add new user to the database.
   */

  addUserDetails(data) : Observable<any> {
    console.log(data);
    return this.httpClient.post(this.baseURL + "addUsersDetails", data);
  }

  /**
   * Purpose: Fetch Contacts data from the database.
   */

  getContactDetails() : Observable<any> {
    return this.httpClient.get(this.baseURL + "getContactDetails");
  }

  /**
   * Purpose: Delete Contacts data to the database by Using userId.
   */

  deleteContactDetails(id): Observable<any> {
    return this.httpClient.delete(this.baseURL + "deleteContactDetailsByID",{
      headers: new HttpHeaders(),
      params: new HttpParams().append('id', id),
    });
  }

  
  /**
   * Purpose: Update Contacts data to the database by using UserId.
   */

  updateEmployeeData(id: number, data : AddressBook) : Observable<any> {
    console.log("Update 2",data);
    return this.httpClient.put(this.baseURL + "updateContactDetailsByID?id=" +id, data);

  }

}
