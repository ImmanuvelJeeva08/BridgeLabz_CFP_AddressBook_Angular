import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddressBook } from '../model/address-book';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  employeeSource = new BehaviorSubject(new AddressBook());
  
  currentEmployee = this.employeeSource.asObservable();

  constructor() { }

  changeEmployee(contact: AddressBook) {
    this.employeeSource.next(contact);
  }
}
