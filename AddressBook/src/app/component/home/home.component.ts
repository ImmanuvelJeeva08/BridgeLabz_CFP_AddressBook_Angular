import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressBook } from 'src/app/model/address-book';
import { HttpService } from 'src/app/service/http.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  addressDetails : AddressBook[] = [];

  constructor(
    private httpService : HttpService,
    private dataService : DataService,
    private router : Router
  ) { }

  /**
   * Purpose: Ability to fetch data from the database.
   */

  ngOnInit(): void {
    this.httpService.getContactDetails().subscribe(data=>{
        console.log(data);
        this.addressDetails = data.data;
    });

  }

  /**
   * Purpose: Ability to remove data from the database.
   *          this.ngOnInit() refreshes the HOME page.
   * 
   * @param id whichever person is required to be removed from the database,
   *                its id is send along with the remove method.
   */

  remove(id : number){
    console.log(id);
    this.httpService.deleteContactDetails(id).subscribe(data=>{
        console.log(data);
        this.ngOnInit();
    });
  }

  /**
   * Purpose: Ability to update data from the database.
   *          this.router.navigateByUrl() navigates to the edit form page along with the person details.
   * 
   * @param address whichever person is required to be updated in the database,
   *                its id is send in the url.
   */

  update(address : AddressBook){
    console.log(address);
    console.log(address.id);
    this.dataService.changeEmployee(address);  
    this.router.navigateByUrl('/edit/' +address.id);
  }

}
