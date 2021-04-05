import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { User } from '../authentication/model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup;
  errorOccured = false;
  errorMessage = '';

  /**
   * it builds the form with validators to be able
   * to control user's input
   */
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.max(50)]],
      lastName: ['', [Validators.required, Validators.max(50)]],
      email: ['', Validators.email],
      password: [
        '',
        [Validators.required, Validators.min(8), Validators.max(128)],
      ],
    });
  }

  /**
   * Submit the form when the user's inputs are correct
   */
  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }
    this.errorOccured = false;
    this.errorMessage = '';
    const userCreated = new User({
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
    });
    try {
      await this.authService.register(userCreated, this.form.value.password);
      this.router.navigate(['/signIn']);
    } catch (error) {
      this.errorOccured = true;
      this.errorMessage = error.message;
    }
  }
}
