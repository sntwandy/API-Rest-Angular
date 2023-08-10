import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URL_USERS } from 'src/app/constant';
import { CreateUserDTO, User } from 'src/app/models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  create(dto: CreateUserDTO) {
    return this.http.post<User>(API_URL_USERS, dto);
  }

  getAll() {
    return this.http.get<User[]>(API_URL_USERS);
  }
}
