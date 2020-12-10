import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {Art} from '../_models/art';
import {User} from '../_models/user';
import {NotificationService, AuthService, SimpleService, ArtService} from '../_services';
import {Role} from '../_models/role';
import { first } from 'rxjs/operators';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'art-component',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.css']
})
export class ArtComponent implements OnInit {
  @Input() art: Art;
  @Input() user: User;
  @Output() deleteEvent = new EventEmitter<string>();
  // TODO: notice the new event emmiters. This will communicate user interactions with this component to the home component.
  @Output() registerEvent = new EventEmitter<string>();
  @Output() createAttendanceEvent = new EventEmitter<string>();
  @Output() PicturePageEvent = new EventEmitter<string>();
    @Output() artistPageEvent = new EventEmitter<string>();

     registeredList: string[];
     userRole = '';
     added = false ;
     userId = '';
     favorite = false;
    username;


  get isCreator() {
      return this.userRole && this.userRole === Role.creator;
  }

   constructor(private notifService: NotificationService, private authService: AuthService, private simpleService: SimpleService, private artService: ArtService ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(x => {
        if (x) {
        this.registeredList = x.arts;
        this.username = this.simpleService.username;
        this.userRole = x.role;
        this.userId = x._id;
        console.log(this.artService.getEnrolledusers(this.art._id));


        }}

        );
  }

  delete(id) {
    this.deleteEvent.emit(id);
  }
  fav(id) {
    this.artService.favorite(id).pipe(first()).subscribe(() => {

    //  this.loadAllClasses();
    });
    this.art.favorited = true;

  }
  unfav(id) {
    this.artService.unfavorite(id).pipe(first()).subscribe(() => {

      //  this.loadAllClasses();
      });
    this.art.favorited = false;

  }
  like(id) {
    console.log("liking");
    var value = this.art.likeTotal + 1;
    this.artService.like(id, value).pipe(first()).subscribe(() => {

      //  this.loadAllClasses();
      });
    this.art.liked = true;

  }
  unlike(id) {
    console.log("unliking");
    var value = this.art.likeTotal - 1;
    if( value < 0){
      value =0;
    }
    this.artService.unlike(id,value).pipe(first()).subscribe(() => {

      //  this.loadAllClasses();
      });
    this.art.liked = false;

  }

  register(id) {
    console.log('Is this  this?' + id);
    this.simpleService.id = id;
    this.added = true;
    this.registerEvent.emit(id);
  }

  attendance(id) {
        console.log('hi');
        this.simpleService.id = id;

        this.createAttendanceEvent.emit(id);
  }


    // this is for the prof
    viewPicturePage(id: string) {
      console.log('viewing art');
      this.simpleService.id = id;
      this.PicturePageEvent.emit(id);
    }

    // this is for the user
    viewArtistPage(id: string ) {
      this.simpleService.id = id;
      console.log('The user id is ' + this.userId);
      this.simpleService.user = this.userId;

      this.artistPageEvent.emit(id);
    }
}

