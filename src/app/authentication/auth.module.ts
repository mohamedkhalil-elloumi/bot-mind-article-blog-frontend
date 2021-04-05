import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthClient } from './auth.client';

@NgModule({
  imports: [HttpClientModule, RouterModule],
  providers: [AuthService, AuthClient],
})
export class AuthModule {}
