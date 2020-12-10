import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ArtService, SimpleService} from '../_services';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @Output() deleteEvent = new EventEmitter<string>();
  constructor(private route: ActivatedRoute, private artService: ArtService,    private router: Router,
    private simpleService: SimpleService) { }

  color = 'red';
  mode = 'determinate';
  temp = [];
  attendanceRate = 0;
  dataSource;
  artID;
  artistName;
 attendanceTotal;
 attendCount= 0;
  displayedColumns: string[] = ['startTime', 'missed'];
  public attends: any = [];

  // This is used by the Angular Material Table.
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {


    // TODO: you need to do the following:
    // --fetch the data passed to the component
    // from whereever it is called from (Hint: look at classattendances.component.ts
    // -- produce and array of JSONs with 'startTime', 'missed' and populate the Angular material table
    // -- compute the attendance rate for 'attendanceRate

    //this.artID = this.simpleService.id;
    this.artistName = this.simpleService.username;
    console.log('The art id is ' + this.artID);
this.route.params.subscribe(params => {
     // this.artID = params.artID;

      this.artService.getArtist( this.artistName).subscribe((Response: any) => {
        console.log(Response);
        console.log(Response.list);
        this.attendanceTotal =  Response.length;

        for (let i = 0 ; i < Response.length; i++) {
          this.attends.push(Response[i]);
        }
   // tslint:disable-next-line: align
        console.log('The number of attendances is ' + this.attends.length);

     // TODO: your code goes here. Hint: you will have to deal with nested ".subscribe()"s

  

    });





      





     // TODO: your code goes here. Hint: you will have to deal with nested ".subscribe()"s



    });

     // TODO: your code goes here. Hint: you will have to deal with nested ".subscribe()"s



   



  }


  // Hint: create a helper function that will compute how many times the user has attended.
  // getAttended(temp): number {
  //
  // }
  delete(id) {
    this.deleteEvent.emit(id);
  }

  viewPicturePage(id: string) {
    console.log("HIIIIII");

    this.router.navigate(['/getPicture']);
  }
  edit(id) {
    // TODO:You need to use a Router instnace to navigate the user to the
    // 'artcreator' component's route.
    // This will load the 'artcreator' component
    this.simpleService.id = id;
    this.router.navigate(['/editArt']);

  }
}
