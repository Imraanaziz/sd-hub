import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  signInForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private UserService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void{
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit(): void {
    if(this.signInForm.valid) {
      const {email, password } = this.signInForm.value;
      console.log('Sign-In Data: ', {email});

      this.UserService.login({email, password}).subscribe({
        next: (res) =>{
          console.log(res);         
        },
        error: (err) => {
          console.log(err.error);
        },
        complete: () => {
          console.log("Login Complete") ;
          this.router.navigate(['/admin']);         
        },
      });
    } else {
      console.log("Validation Failed")
    }
  }

}
