import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}


  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService.create({
      name: 'Megan',
      email: 'megan@gmail.com',
      password: '1234'
    })
      .subscribe(user => console.log(user))
  }

  login() {
    this.authService.login('megan@gmail.com', '1234')
      .subscribe(token => console.log(token.access_token))
  }
}
