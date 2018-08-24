import { Injectable } from '@angular/core';
import {Jsonp} from '@angular/http';
import {of,Observable,throwError} from  'rxjs';
import { map,catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  constructor(private jsonp:Jsonp) {     
  }  

  
  public loadFlickrImages():Observable<any>{
    //&callback=JSONP_CALLBACK
    let apiUrl='https://api.flickr.com/services/feeds/photos_public.gne?format=json';
    return this.jsonp.request(apiUrl).pipe(
        map(res => {
          // return res.json().results.map(item => {
          //   return new SearchItem(
          //       item.trackName,
          //       item.artistName,
          //       item.trackViewUrl,
          //       item.artworkUrl30,
          //       item.artistId
          //   );
          // });
          return res.json();
        }), catchError( error => {
          return throwError( 'Something went wrong!' )
        }));
  }
  
  public loadFlickrImagesFromApi(){
    //&callback=JSONP_CALLBACK
    let apiUrl='https://api.flickr.com/services/feeds/photos_public.gne?format=json';
    return this.jsonp.request(apiUrl).subscribe(()=>{    
      return  ;
    },(error)=>{    
      return;
    });
  }
}
