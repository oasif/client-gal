
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Art } from '../_models/art';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class ArtService {
    constructor(private http: HttpClient) { }

    getAll() {
        console.log('getAll()');
        return this.http.get<Art[]>(`http://localhost:4000/art/getarts`);
    }



    //TODO: notice this new function.
    getEnrolledusers(artID: string) {
        console.log("The returning values are " +this.http.get<any>(`http://localhost:4000/art/getusers${artID}`));
        return this.http.get<any>(`http://localhost:4000/art/getusers${artID}`);
    }


    delete(id: string) {
        return this.http.delete(`http://localhost:4000/art/${id}`);

    }
    getPicture(artID: string) {
      
       
        console.log("We are wanting a picture, the art id is " + artID);
        return this.http.get<any>(`http://localhost:4000/art/getPicture${artID}`);
    }
    favorite(artID: string) {
      
        console.log("HIIIIIIII");
        let obj = 
        {
           "artID": artID,
        };
        //console.log("We are wanting a picture, the art id is " + artID);
        return this.http.post(`http://localhost:4000/art/favorite`, obj);

    }
    unfavorite(artID: string) {
        let obj = 
        {
           "artID": artID,
        };
       
        //console.log("We are wanting a picture, the art id is " + artID);
        return this.http.post(`http://localhost:4000/art/unfavorite`, obj);
    }
    like(artID: string, total: number) {

        let obj = 
        {
           "artID": artID,
           "value": total,
        };
       
        //console.log("We are wanting a picture, the art id is " + artID);
        return this.http.post(`http://localhost:4000/art/like`, obj);
    }
    unlike(artID: string, total: number) {
        let obj = 
        {
           "artID": artID,
           "value": total,

        };
       
        //console.log("We are wanting a picture, the art id is " + artID);
        return this.http.post(`http://localhost:4000/art/unlike`, obj);
    }
    
    getArtist(artist: string) {
      
       
        console.log("We are wanting the artists collection " + artist);
        return this.http.get<any>(`http://localhost:4000/art/getArtistPictures${artist}`);
    }

    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        return throwError(
          'Something bad happened; please try again later.');
      }

    createArt(art: Art, file: File): Observable<any> {
        // art.tags = art.tagList.split(",");
        art.imageLink = "assets/" + art.imageLink;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('tagList', art.tagList);
        formData.append('pieceName', art.pieceName);
        formData.append('createdDate', art.createdDate.toString());
        formData.append('imageLink', art.imageLink);
        formData.append('artistName', art.artistName);
        formData.append('medium', art.medium);
        formData.append('pieceInfo', art.pieceInfo);
        const header = new HttpHeaders();
        const params = new HttpParams();
    
        const options = {
          params,
          reportProgress: true,
          headers: header
        };
        const req = new HttpRequest('POST', 'http://localhost:4000/art/addart', formData, options);
        return this.http.request(req);
    }

    // addGallery(gallery: Gallery, file: File): Observable<any> {
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     formData.append('imageTitle', gallery.imageTitle);
    //     formData.append('imageDesc', gallery.imageDesc);
    //     const header = new HttpHeaders();
    //     const params = new HttpParams();
    
    //     const options = {
    //       params,
    //       reportProgress: true,
    //       headers: header
    //     };
    //     const req = new HttpRequest('POST', apiUrl, formData, options);
    //     return this.http.request(req);
    //   }


    editArt(art: Art, id: string) {
        console.log("editArt");
        art.tags = art.tagList.split(",");
        console.log("hello world," , art.tags);
        art._id = id;
        console.log("hello world," , art._id);

        art.imageLink = "assets/" + art.imageLink;
        return this.http.post(`http://localhost:4000/art/edit`, art);
    }

}
