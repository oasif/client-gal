import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { NotificationService } from '../_services/notification.service';
import { ArtService } from '../_services/art.service';
import { AuthService } from '../_services/auth.service';

import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({templateUrl: 'registerArt.component.html',

  styleUrls: ['registerArt.component.css']

})
export class RegisterArtComponent implements OnInit {
  registerArtForm: FormGroup;
  imageFile: File = null;
  matcher = new MyErrorStateMatcher();
  loading = false;
  submitted = false;


  constructor(
      // private patternValidator: PatternValidator,
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService,
      private artService: ArtService,
      private notification: NotificationService
  ) {
    // redirect to home if already logged in

  }

  ngOnInit() {
    this.registerArtForm = this.formBuilder.group({
      imageFile : [null, Validators.required],
      pieceName: [''],
      tagList: [''],
      createdDate: [''],
      imageLink: [''],
      artistName: [''],
      favorited: false,
      medium: [''],
      pieceInfo: ['']

    });


  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerArtForm.controls; }

  onSubmit() {
    console.log('submit register art');
    // this.submitted = true;
    // stop here if form is invalid
    // if (this.registerArtForm.invalid) {
    //   console.log('Error in onSubmit()');
    //   return;
    // }

    this.loading = true;
  
    // this.artService.createArt(this.registerArtForm.value)
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //           //  this.alertService.success('Registration successful', true);
    //           this.notification.showNotif('Registration successful', 'confirmation');
    //           this.router.navigate(['/home']);
    //         },
    //         error => {
    //           console.log('Error:', error);
    //           this.notification.showNotif(error);
    //           this.loading = false;
    //         });
    // this.router.navigate(['/home']);


    this.artService.createArt(this.registerArtForm.value, this.registerArtForm.get('imageFile').value._files[0])
      .subscribe((res: any) => {
        this.loading = false;
        if (res.body) {
          this.notification.showNotif('Registration successful', 'confirmation');
          this.router.navigate(['/home'])
        }
      }, (err: any) => {
        console.log(err);
        this.loading = false;
      });
  }
}
