import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  public user : User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService : HttpService
  ) {
    
    /**
     * Added validations to the employee payroll form data.
     */

    this.registerForm = this.formBuilder.group({
      userName: new FormControl('', [ Validators.required, Validators.pattern("^[A-Z][a-zA-z\\s]{2,}$")]),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {  
  }

  onSubmit(){
    console.log(this.registerForm.value);
    this.user = this.registerForm.value;
          this.httpService.addUserDetails(this.user).subscribe(data =>{
            console.log("post",data);
          })
    this.router.navigateByUrl("/login");

  }

  /**
   * Purpose: checkError() is called during validation of the form fields.
   * 
   * @param controlName field name for which the method is called.
   * @param errorName error details which is displayed to the user.
   * @returns 
   */

  public checkError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

}
