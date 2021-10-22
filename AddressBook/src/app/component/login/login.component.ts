import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public UserDetails: User[] = [];
  public UserDetail = new User();
  public loginUser : User = null;
  change : boolean = true;
  errorMessage = "";
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  username: string;
  password : string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpService : HttpService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    /**
     * While login process , If user email and password matches correct then navigate to Home Page
     * Otherwise show Invalid login details error
     */

        this.httpService.login(this.loginForm.value).subscribe(
              data=>{
                console.log(data);
                this.router.navigateByUrl("/home");
              },
              error => {alert(' enter valid username and password ');
                        this.errorMessage = "Invalid Credentials"; 
              }
        );

  }
  
}