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
  
  public loadFlickrImagesFromApi(){
    //As this is a cross domailn request we have to do JsonP request
    //As Jsonp request returns interms of callback and returns specific callback name "jsonFlickrFeed" 
    //so this method must be available in window object and this will not be catched in subscribe block
    let apiUrl='https://api.flickr.com/services/feeds/photos_public.gne?format=json';
    return this.jsonp.request(apiUrl).subscribe(()=>{    
      return  ;//Nothing to do in subscribe block as this will never trigger and callback function will trigger
    },(error)=>{    
      return;
    });
  }
}
