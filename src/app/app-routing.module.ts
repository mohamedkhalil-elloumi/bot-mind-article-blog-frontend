/**
 * Routing module: it defines the routes of the app.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { ErrorComponent } from './shared/error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserArticleComponent } from './article/user-article/user-article.component';

const routes: Routes = [
  // This is a protected route, using the AuthenticationGuard to protect it.
  { path: '', component: ArticleComponent, canActivate: [AuthenticationGuard] },
  {
    path: 'myArticles',
    component: UserArticleComponent,
    canActivate: [AuthenticationGuard],
  },
  { path: 'signIn', component: LoginComponent },
  { path: 'signUp', component: RegisterComponent },
  { path: 'error', component: ErrorComponent },
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard],
})
export class AppRoutingModule {}
