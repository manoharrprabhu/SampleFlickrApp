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
    (window as any).jsonFlickrFeed=this.jsonFlickrFeed;
    this.loadAllFlickrImages();
  }
  title = 'My Flickr App';
  flickrData:FlickrResponseModel=new FlickrResponseModel();
  flickrImages:FlickrImages[]=[];
  private lastPaginationIndex=0;
  jsonFlickrFeed=(data:FlickrResponseModel)=>{
    this.flickrData=data; 
    this.paginationation();
  }
   
  private paginationation(){
    if(this.flickrData.items.length>=(this.lastPaginationIndex+1)){
      this.flickrImages=this.flickrImages.concat(this.flickrData.items.slice(this.lastPaginationIndex,this.lastPaginationIndex+6));
      this.lastPaginationIndex+=6;
    }
  }

  private loadAllFlickrImages(){
    
    this.flickrService.loadFlickrImagesFromApi();
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll=(event)=> {
      let pos = (this.document.documentElement.scrollTop || this.document.body.scrollTop) + this.document.documentElement.clientHeight;
      let max = this.document.documentElement.scrollHeight;
      // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
      if(pos == max )   {
      //Do your action here
      this.paginationation();
      }
  }
}
