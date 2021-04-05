import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './model/user.model';
import jwtDecode from 'jwt-decode';
import { AuthClient } from './auth.client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private authClient: AuthClient) {
    if (this.token !== null) {
      const tokenToDecode = this.token.split(' ')[1].toString();
      const tokenDecoded = this.decodeToken(tokenToDecode);
      this.currentUserSubject = new BehaviorSubject<User>(tokenDecoded);
    } else {
      this.currentUserSubject = new BehaviorSubject<User>({} as User);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    return this.token !== null;
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const token = await this.authClient.login(email, password).toPromise();
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('token', `Bearer ${token}`);
      const user = this.decodeToken(token);
      this.currentUserSubject.next(user);
      this.currentUser = this.currentUserSubject.asObservable();
      return Promise.resolve(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async register(user: User, password: string): Promise<void> {
    try {
      await this.authClient.register(user, password).toPromise();
      return Promise.resolve();
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(userId: number): Promise<any> {
    try {
      await this.authClient.deleteUser(userId).toPromise();
      localStorage.removeItem('token');
      this.currentUserSubject.next({} as User);
      Promise.resolve(true);
    } catch (error) {
      Promise.reject(false);
      throw new Error(error);
    }
  }

  logout(): void {
    // remove token from local storage to log user out
    localStorage.removeItem('token');
    this.currentUserSubject.next({} as User);
  }

  private decodeToken(token: string): User {
    const decodedToken = jwtDecode(token);
    const user = new User(decodedToken);
    return user;
  }
}
