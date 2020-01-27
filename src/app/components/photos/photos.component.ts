import { PhotosService } from './../../services/photos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  photos;
  albumId;
  filteredPhotos;

  private searchTerm: string;
  get getSearchTerm(): string {
    return this.searchTerm;
  }
  set setSearchTerm(value: string) {
    this.searchTerm = value;
    this.filteredPhotos = this.filterPhotos(value);
  }

  filterPhotos(searchString: string) {
    return this.photos.filter(photo =>
      photo.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(
    private photosService: PhotosService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  private fetchData() {
    this.spinner.show();
    this.albumId = this.route.snapshot.params.albumId;
    const promise = this.photosService.getPhotos(this.albumId);
    promise.then((data) => {
      this.photos = data;
      this.filteredPhotos = this.photos;
    }).catch((error) => {
      console.log(JSON.stringify(error));
    }).finally(() => {
      this.spinner.hide();
    });
  }

}
