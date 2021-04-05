/**
 * The dialog service allows the opening and closing
 * of the ConfirmDelete component and returns the confirmation
 * (which is a boolean variable) when the user clicks on
 * one of the buttons of the dialog.
 */
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from './confirm-delete.component';

@Injectable({
  providedIn: 'root',
})
export class DeleteDialogService {
  deleteModalRef: MatDialogRef<ConfirmDeleteComponent>;

  constructor(private dialogService: MatDialog) {}

  async confirmDelete(message: string): Promise<boolean> {
    this.deleteModalRef = this.dialogService.open(ConfirmDeleteComponent, {
      width: '400px',
      data: {
        message,
      },
    });

    return this.deleteModalRef.afterClosed().toPromise();
  }
}
