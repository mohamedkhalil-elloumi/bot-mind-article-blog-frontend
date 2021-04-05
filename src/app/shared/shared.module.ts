/**
 * The shared components of the app are in this module.
 * The components in this module are used by all components of the app.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { DeleteDialogService } from './confirm-delete/delete-dialog.service';
import { ErrorComponent } from './error/error.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SnackBarService } from './snackbar/snackbar.service';

@NgModule({
  entryComponents: [SnackbarComponent],
  declarations: [ErrorComponent, SnackbarComponent, ConfirmDeleteComponent],
  imports: [CommonModule, FlexLayoutModule, MaterialModule, RouterModule],
  providers: [SnackBarService, DeleteDialogService],
})
export class SharedModule {}
