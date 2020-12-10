import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService, SimpleService} from '../_services';
import { ArtService } from '../_services/art.service';

import {first} from 'rxjs/operators';
import { Art } from '../_models/art';

@Component({
  selector: 'app-picturepage',
  templateUrl: './picturepage.component.html',
  styleUrls: ['./picturepage.component.css']
})


export class PicturePageComponent implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute,      private simpleService: SimpleService,

               private artService: ArtService, private notification: NotificationService, ) {
  }
  test: any;
  report = [];
  artID  = '';
  public users: any = [];
  public attends: any = [];
  attendanceTotal = -100000000;
  userTotal ;
  artAttendances = [];
  public weather: any[] = [];
  attended = 0;
  total = 0;
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'attendanceRate', 'id'];
  dataSource =this.users;
  picture: Art;
  ngOnInit() {
// TODO: here you should do the following:
//  -- get artID from the route params (already done)
//  -- fetch the 'attendances' associated with this art
//  -- get a list of users enrolled in this art
//  -- populate the 'Angular material' table with data that matches the columns specified by 'displayedColumns'
this.artID = this.simpleService.id;
console.log('The art id is ' + this.artID);
this.route.params.subscribe(params => {
     // this.artID = params.artID;
      console.log('The art id is ' + this.artID);

      this.artService.getPicture(this.artID).subscribe((Response: any) => {
        console.log(Response);
        this.picture  = Response[0];
        console.log("The picure " + this.picture);
        

        
         
     // TODO: your code goes here. Hint: you will have to deal with nested ".subscribe()"s



    });
    
     // TODO: your code goes here. Hint: you will have to deal with nested ".subscribe()"s

     

    });
  

  }


  // TODO: you need to produce an array of JSON with the following fields: 'username', 'firstName', 'lastName', 'attendanceRate', 'id'. Create a "getter" that will process the 'user' and 'artAttendances' arrays to produce an array of JSONS suitable for the Angular material table.
  // Hint: a possible way to solve this requires two nested loops + map.
   get producePerPersonaAttendanceReport() {
    const obj = {
       id: 'test'
    };
    return obj;
   }

  // TODO: create a fucntion that will use 'router' to navigate the creator to 'userattendnaces' component.
  // You must pass artID and userID.
  artistProfile(artist: string) {
    console.log("getting artist here");
    this.simpleService.user = artist;
    this.router.navigate(['/artistpage']);
  }
}


