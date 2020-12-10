import {Component, OnInit} from '@angular/core';

import {Art} from '../_models/art';
import {NotificationService} from '../_services/notification.service';
import {ArtService} from '../_services/art.service';
import {first} from 'rxjs/operators';
import {Route, Router} from '@angular/router';
import {UserService, AuthService} from '../_services';
import {User} from '../_models/user';
import {Role} from '../_models/role';
import { HttpClient } from '@angular/common/http';

@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {
  currentUser: User;

  arts: Art[] = [];
    constructor(
    private artService: ArtService,
    private userService: UserService,
    private authService: AuthService,
    private notifService: NotificationService,
    private router: Router,
    private http: HttpClient
  ) {

      // Observing currentUser. We will need it to get user's id.
      this.authService.currentUser.subscribe(x => this.currentUser = x);

    }

  ngOnInit() {
    this.loadAllClasses();
      }


  private loadAllClasses() {

    this.artService.getAll().subscribe(
      arts => {this.arts = arts; },
        error => {this.notifService.showNotif(error, 'error'); });
  }

  createArt() {
    // TODO:You need to use a Router instnace to navigate the user to the
    // 'artcreator' component's route.
    // This will load the 'artcreator' component
    this.router.navigate(['/registerArt']);

  }

  // TODO: call this function when user's want to track attendance.
  //  Use Router's route function to navigate to the 'attendancetracker' component.
  trackAttendance() {
    this.router.navigate(['/trackAttendance']);
  }

  //TODO: use this getter in the HTML to hid the buttons that creator's shouldn't see.
  get isCreator(){
      return this.currentUser.role === Role.creator;
  }

  deleteArt(id: string) {
    this.artService.delete(id).pipe(first()).subscribe(() => {
      this.arts = null;
      this.loadAllClasses();
    });
  }

  //TODO: here you receive the id of the art that the user wants to register. Use userService to complete this request.
  registerArt(id: string) {
    console.log("testing");
    this.userService.registerArt(id).pipe(first())
    .subscribe(
        () => {
         this.notifService.showNotif('user has  added the art', 'confirmation');

        },
        error => {
          console.log('Error:', error);
          this.notifService.showNotif(error);
          //this.loading = false;
        });
        this.router.navigate(['/']);
      //  return this.http.post(`http://localhost:4000/user/registerart`, id);
      }

  //TODO: here you receive the id of the art for which a creator wants to create a new attendance object.
  // you will 'carry' that art id to the 'attendancecreator' component that will be opened shortly after the button click.
  // use Router's navigate function to pass information to the other component.
  createAttendance(id: string) {
    console.log("hello world, the id is" + id);
    this.router.navigate(['/createAttendance']);
  }


  //TODO: this is very similar to 'createAttendance()' except here you pass two bits of information to 'userattendances' component: artID and userID. Again, use Router's navigate function to pass information to the other component. Hint: you can use 'this.currentUser._id' to get userID.
  viewArtistPage(id: string) {
    this.router.navigate(['/artistpage']);
  }

  // TODO:  use Router's navigate function to pass artID to the 'classattendances' component.
  viewPicturePage(id: string) {
    console.log("HIIIIII");

    this.router.navigate(['/getPicture']);
  }
  sort(){
    this.arts = this.arts.sort((n1,n2) => {
      console.log(n1.likeTotal,  " <" , n2.likeTotal );
      if (n1.likeTotal < n2.likeTotal) {
          return -1;
      }
      if (n1.likeTotal > n2.likeTotal) {
          return 1;
      }
      return 0;
  });


  }
}

