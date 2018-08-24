export class FlickrResponseModel{
    title:string;
    link:string;
    description:string;
    modified:Date;
    generator:string;
    items:FlickrImages[];    
}

export class FlickrImages{
    title:string;
    link:string;
    media:Media;
    date_taken:Date;
    description:string;
    published:Date;
    author:string;
    author_id:string;
    tags:string;
}

export class Media{
    m:string
}