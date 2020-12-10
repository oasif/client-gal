import { Component } from '@angular/core';
import {AuthService} from './_services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from './_services/notification.service';
import {User} from './_models/user';
import {Role} from './_models/role';
import { SimpleService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HW5Angular';
  currentUser: User;
  tcode: string;


  constructor(  private router: Router,
                private authService: AuthService,
                private notifService: NotificationService,
                private simpleService: SimpleService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    if (this.currentUser) {
      this.simpleService.username = this.currentUser.username;
    }
  }

  get isCreator() {
     return this.currentUser && this.currentUser.role === Role.creator;
  }

  get isUser() {

    return this.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  onSubmit() {
    console.log("The search term is " +this.tcode);  
}

}
