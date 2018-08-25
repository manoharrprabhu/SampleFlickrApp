import { Component,HostListener,Inject } from '@angular/core';
import {FlickrService} from './flickr.service'
import {FlickrImages,FlickrResponseModel} from './flickrData.model';
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private flickrService:FlickrService,@Inject(DOCUMENT) private document: Document){
    //Register the call back function in the window object
    (window as any).jsonFlickrFeed=this.jsonFlickrFeed;
    
    //Call the Flickr service first time
    this.loadAllFlickrImages();
  }
  title = 'My Flickr App';  
  flickrImages:FlickrImages[]=[];

  //When Jsonp callback is invoked it will this method with data from flickr
  jsonFlickrFeed=(data:FlickrResponseModel)=>{
    this.title=data.title;//Set the Page header 
    this.flickrImages=this.flickrImages.concat(data.items);  //Append the images to same array so that on scroll bottom it will update same
  }
   
  private loadAllFlickrImages(){
    //Trigger Flickr service to get data
    this.flickrService.loadFlickrImagesFromApi();
  }

  //listen window scroll event
  @HostListener("window:scroll", ["$event"])
  onWindowScroll=(event)=> {
      let pos = (this.document.documentElement.scrollTop || this.document.body.scrollTop) + this.document.documentElement.clientHeight;
      let max = this.document.documentElement.scrollHeight;
      // check if current scroll position equals to total scroll height
      if(pos == max )   {
        //call the flickr service again to load more data
        this.loadAllFlickrImages();
      }
  }
}
