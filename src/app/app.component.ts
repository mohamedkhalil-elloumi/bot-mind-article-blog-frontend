import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from './authentication/auth.service';
import { DeleteDialogService } from './shared/confirm-delete/delete-dialog.service';
import { SnackBarService } from './shared/snackbar/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  username: string;
  userId: number;
  isLoggedIn = false;

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackbar: SnackBarService,
    private deleteDialogService: DeleteDialogService
  ) {}

  ngOnInit(): void {
    // Setup the username and the user id
    this.authService.currentUser.subscribe((user) => {
      if (user.email) {
        this.username = `${user.firstName} ${user.lastName}`;
        this.userId = user.id as number;
        this.isLoggedIn = true;
      }
    });
  }

  // Closes the sidenav when the user change page.
  changeActivePage(): void {
    this.sidenav.close();
  }

  // Toggles the sidenav using the menu button.
  toggleSidenav(): void {
    this.sidenav.opened ? this.sidenav.close() : this.sidenav.open();
  }

  // Delete an account
  async deleteAccount(): Promise<void> {
    // Wait until the user confirms the deletion of their accout.
    const confirm: boolean = await this.deleteDialogService.confirmDelete(
      'Are you sure to delete your account? There is no going back!'
    );

    // If the user cancel, it does nothing
    if (!confirm) {
      return;
    }

    try {
      // Delete the user and redirect them back to the login page.
      await this.authService.deleteUser(this.userId);
      this.isLoggedIn = false;
      this.router.navigate(['/signIn'], {
        queryParams: { displayMessage: true },
      });
    } catch (error) {
      this.snackbar.showErrorMessage(error.message);
    }
  }

  // Sign out the user and go to the login page.
  logout(): void {
    this.isLoggedIn = false;
    this.authService.logout();
    this.router.navigate(['signIn']);
  }
}
