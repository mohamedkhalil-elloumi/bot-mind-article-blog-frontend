import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthClient {
  private http: HttpClient;
  private apiUrl = process.env.API_URL || '';

  constructor(@Inject(HttpClient) http: HttpClient) {
    this.http = http;
  }

  login(email: string, password: string): Observable<string> {
    const url = `${this.apiUrl}/auth/login`;
    const body = { email, password };
    return this.http.post(url, body).pipe(
      map((data: any) => {
        const token: string = data.token;
        return token;
      }),
      catchError((error) => throwError(error))
    );
  }

  register(user: User, password: string): Observable<string> {
    const url = `${this.apiUrl}/auth/register`;
    const body = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password,
    };
    return this.http.post(url, body).pipe(
      map((data: any) => {
        const message: string = data.message;
        return message;
      }),
      catchError((error) => throwError(error))
    );
  }

  deleteUser(userId: number): Observable<string> {
    const url = `${this.apiUrl}/auth/${userId}`;
    return this.http.delete(url).pipe(
      map((data: any) => {
        const message: string = data.message;
        return message;
      })
    );
  }
}
