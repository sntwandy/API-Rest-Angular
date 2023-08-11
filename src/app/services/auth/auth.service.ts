import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL_AUTH_LOGIN, API_URL_AUTH_PROFILE } from 'src/app/constant';
import { User } from 'src/app/models/users.model';
import { Auth } from 'src/app/models/auth.model';
import { tap } from 'rxjs/operators';
import { TokenService } from 'src/app/services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(API_URL_AUTH_LOGIN, { email, password })
      .pipe(
        tap(response => this.tokenService.save(response.access_token))
      )
  }

  getProfile() {
    return this.http.get<User>(API_URL_AUTH_PROFILE);
  }
}
