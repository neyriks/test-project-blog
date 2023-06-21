import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { User } from '../../../shared/interfaces/user.interface';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environment.prod';
import { FbAuthResponse } from 'src/app/shared/interfaces/fbAuth.interface';

@Injectable()

export class AuthService {
  constructor(private http: HttpClient) {}

  public error$: Subject<string> = new Subject<string>()

  get token(): any {
    const expiresDate = new Date(localStorage.getItem('fb-token-expires') as any);
    if(new Date() > expiresDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
    .pipe(
      tap(this.setToken),
      catchError(this.handleError.bind(this))
    )
  }

  logout() {
    this.setToken(null)
  }

  isAuth(): boolean {
    return !!this.token
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;

    switch(message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email не найден в базе')
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Неверный Email')
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль')
        break;
    }
    return throwError(error)
  }

  private setToken(response: any) {
    if(response) {
      const expiresDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-expires', expiresDate.toString())
    } else {
      localStorage.clear()
    }
  }
}