import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { SnackBarService } from '../shared/snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginInvalid = false;
  private returnUrl: string;

  /**
   * if the user is already logged in, it redirects them to Home page
   *
   * it builds the form with validators to be able
   * to control user's input
   *
   * if the user was not logged in and they try to reach a protected route,
   * it sets the return URL to the route that the user wanted to enter
   */
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackbar: SnackBarService
  ) {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
    this.form = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  /**
   * if the user deleted his account, a message will be displayed using the snackBar
   */
  ngOnInit(): void {
    const deletedAccount =
      this.route.snapshot.queryParams.displayMessage || false;
    if (deletedAccount) {
      this.snackbar.showSuccessMessage(
        'Your account has been deleted! Hope we see you soon'
      );
    }
  }

  /**
   * Login the user and redirect him to the url they desired to access
   */
  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }
    this.loginInvalid = false;
    const email = this.form.value.email;
    const password = this.form.value.password;
    try {
      await this.authService.login(email, password);
      this.router.navigate([this.returnUrl]);
    } catch (error) {
      this.loginInvalid = true;
    }
  }
}
