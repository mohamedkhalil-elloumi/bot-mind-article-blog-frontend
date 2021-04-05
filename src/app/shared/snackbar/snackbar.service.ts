/**
 * This service provide the opening of the snackbar
 * to show an error or a success message.
 */
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar.component';

export enum SnackBarLevel {
  success = 'success',
  warn = 'warn',
}

@Injectable()
export class SnackBarService {
  private levelToIconsMap = {
    [SnackBarLevel.success]: 'check_circle',
    [SnackBarLevel.warn]: 'error',
  };

  constructor(public snackBar: MatSnackBar) {}

  showErrorMessage(message: string): void {
    this.showMessage(message, SnackBarLevel.warn);
  }

  showSuccessMessage(message: string): void {
    this.showMessage(message, SnackBarLevel.success);
  }

  showMessage(message: string, level: SnackBarLevel): void {
    this.showSnackbar(message, level);
  }

  private showSnackbar(message: string, level: SnackBarLevel): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message,
        action: '',
        icon: this.levelToIconsMap[level],
      },
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
