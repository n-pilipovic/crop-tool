import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageModel } from '../model/image.model';
import { environment } from '../../environments/environment';


@Injectable()
export class DataService {

  constructor(
    private http: HttpClient
  ) {

  }

  saveImages(images: Array<ImageModel>): Promise<any> {
    const url = `${environment.apiPath}/image/save`;

    return this.http.post(url, images).toPromise();
  }

}
