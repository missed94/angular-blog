import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FbAuthResponse, User} from '../interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public error$: Subject<string> = new Subject<string>();

  get token(): string {
    const expDate: Date = new Date(localStorage.getItem('fb-token-exp') as string);

    if (new Date() > expDate) {
      this.logout();
    }

    return localStorage.getItem('fb-token') as string
  }

  login(user: User): Observable<any> {
    return this.http
      .post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(AuthService.setToken),
        catchError(AuthService.handleError.bind(this))
      );
  }

  logout() {
    AuthService.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private static handleError(error: HttpErrorResponse): any {
    const {message} = error.error.error;
    console.log(message);
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        // @ts-ignore
        this.error$.next('Email not found')
        break
      case 'INVALID_EMAIL':
        // @ts-ignore
        this.error$.next('Invalid email')
        break
      case 'INVALID_PASSWORD':
        // @ts-ignore
        this.error$.next('Invalid password')
        break
    }
    throwError(message);
  }


  private static setToken(response: FbAuthResponse | any) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear()
    }

  }
}
