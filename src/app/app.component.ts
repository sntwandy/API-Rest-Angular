import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import { FilesService } from 'src/app/services/files/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';
  imgResponse = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService
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
      .subscribe(token => this.token = token.access_token)
  }

  getProfile() {
    this.authService.getProfile()
      .subscribe(profile => console.log(profile));
  }

  downloadPdf() {
    return this.filesService
      .get(
        'megan.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe((response) => console.log(response, 'Downloaded'));
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0)
    if (file) {
      this.filesService
        .upload(file)
        .subscribe((response) => console.log(response));
    }
  }
}
