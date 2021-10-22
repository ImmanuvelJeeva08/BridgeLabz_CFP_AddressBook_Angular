import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressBook } from 'src/app/model/address-book';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  AddressBookFormGroup : FormGroup;
  public contact : AddressBook = new AddressBook();

  constructor(
    private fb: FormBuilder,
    private httpService : HttpService, 
    private dataService : DataService,
    private router : Router, 
    private route : ActivatedRoute
  ) { 

    /**
     * Added validations to the employee payroll form data.
     */

     this.AddressBookFormGroup = this.fb.group({
      name: new FormControl('', [ Validators.required, Validators.pattern("^[A-Z][a-zA-z\\s]{2,}$")]),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      phoneNo: new FormControl('', [ Validators.required, Validators.pattern("[6-9][0-9]{9}")]),
    })
  }

  ngOnInit(): void {
    
  /**
   * Purpose: Below function will work when we do update process
   */

   if(this.route.snapshot.params['id'] != undefined) {
    this.dataService.currentEmployee.subscribe(contact => {
      if(Object.keys(contact).length !== 0) {
        this.AddressBookFormGroup.patchValue({
          name:contact.name,
          address:contact.address,
          city:contact.city,
          state:contact.state,
          zip:contact.zip,
          phoneNo : contact.phoneNo
        });
      }
    }
    )}
  }

  onSubmit(){

    this.contact = this.AddressBookFormGroup.value;

  /**
   * Purpose: when Submit button pressed , if routes have parameter like id ,then existing user details may modified
   * and will be stored in datebases Otherwise new user details can be stored in databases.
   */

      if(this.route.snapshot.params['id'] != undefined) {
        console.log("update",this.contact);
          this.httpService.updateEmployeeData(this.route.snapshot.params['id'], this.contact).subscribe(data=>{
            console.log(data);
            this.router.navigateByUrl("/home"); 
          });
      }
      else {
        this.contact = this.AddressBookFormGroup.value;
          this.httpService.addContactDetails(this.contact).subscribe(data =>{
            console.log("post",data);
            this.router.navigateByUrl("/home"); 
          })
    }

  }

  /**
   * Purpose: checkError() is called during validation of the form fields.
   * 
   * @param controlName field name for which the method is called.
   * @param errorName error details which is displayed to the user.
   * @returns 
   */

  public checkError = (controlName: string, errorName: string) => {
    return this.AddressBookFormGroup.controls[controlName].hasError(errorName);
  }

}
