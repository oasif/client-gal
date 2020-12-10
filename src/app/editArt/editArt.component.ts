import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { NotificationService } from '../_services/notification.service';
import { ArtService } from '../_services/art.service';
import { AuthService } from '../_services/auth.service';
import { SimpleService } from '../_services';

@Component({templateUrl: 'editArt.component.html',

  styleUrls: ['editArt.component.css']

})
export class EditArtComponent implements OnInit {
  editArtForm: FormGroup;
  loading = false;
  submitted = false;


  constructor(
      // private patternValidator: PatternValidator,
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService,
      private artService: ArtService,
      private notification: NotificationService,
      private simpleService: SimpleService,
  ) {
    // redirect to home if already logged in

  }

  ngOnInit() {
    this.editArtForm = this.formBuilder.group({
      pieceName: [''],
      tagList: [''],
      imageLink: [''],
      medium: [''],
      pieceInfo: ['']

    });


  }

  // convenience getter for easy access to form fields
  get f() {
    return this.editArtForm.controls; }

  onSubmit() {
    console.log('Within on sumbit');
    this.submitted = true;
    // stop here if form is invalid
    if (this.editArtForm.invalid) {
      console.log('Error in onSubmit()');
      return;
    }

    this.loading = true;
  
    this.artService.editArt(this.editArtForm.value, this.simpleService.id)
        .pipe(first())
        .subscribe(
            data => {
              //  this.alertService.success('Registration successful', true);
              this.notification.showNotif('Edit successful', 'confirmation');
              this.router.navigate(['/admin']);
            },
            error => {
              console.log('Error:', error);
              this.notification.showNotif(error);
              this.loading = false;
            });
    this.router.navigate(['/admin']);
  }
}
