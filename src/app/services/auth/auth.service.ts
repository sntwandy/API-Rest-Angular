import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL_AUTH_LOGIN, API_URL_AUTH_PROFILE } from 'src/app/constant';
import { User } from 'src/app/models/users.model';
import { Auth } from 'src/app/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(API_URL_AUTH_LOGIN, { email, password });
  }

  profile(token: string) {
    return this.http.get<User>(API_URL_AUTH_PROFILE, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-tyoe': 'aplication/json'
      }
    });
  }
}
