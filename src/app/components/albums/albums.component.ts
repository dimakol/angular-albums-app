import { PhotosService } from './../../services/photos.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums;
  filteredAlbums;

  private searchTerm: string;
  get getSearchTerm(): string {
    return this.searchTerm;
  }
  set setSearchTerm(value: string) {
    this.searchTerm = value;
    this.filteredAlbums = this.filterAlbums(value);
  }

  filterAlbums(searchString: string) {
    return this.albums.filter(album =>
      album.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(
    private photosService: PhotosService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  private fetchData() {
    this.spinner.show();
    const promise = this.photosService.getAlbums();
    promise.then((data) => {
      this.albums = data;
      this.filteredAlbums = this.albums;
    }).catch((error) => {
      console.log(JSON.stringify(error));
    }).finally(() => {
      this.spinner.hide();
    });
  }

}
