import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/**
 * The PhotosService responsible for the HttpClient requests
 */
export class PhotosService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get all albums from jsonplaceholder API
   */
  async getAlbums() {
    try {
      const data = await this.http.get('https://jsonplaceholder.typicode.com/albums').toPromise();
      return data;
    } catch (error) {
      console.log(error);
     }
  }

  /**
   * Get photos by albumId from jsonplaceholder API
   * @param albumId - number
   */
  async getPhotos(albumId) {
    try {
      const data = await this.http.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`).toPromise();
      return data;
    } catch (error) {
      console.log(error);
     }
  }
}
