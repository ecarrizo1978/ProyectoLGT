
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MultiArchivoService {

  // API url
  auxUrl!: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.JWT
    })
  }

constructor(private http: HttpClient) {

  this.auxUrl = environment.servidor + ':' + environment.puerto + '/';
}

  upload(file: File): Observable<HttpEvent<any>> {

    const formData = new FormData();
    formData.append('file', file, file.name)
    console.log('fileToUpload.name', file.name);


    return this.http.post<any>(this.auxUrl + "api/Upload/UploadFiles", formData, {
      reportProgress: true,
      observe: 'events',
      headers: this.httpOptions.headers
    });


  }

  getFiles(): Observable<any> {
    console.log('in getFiles service');
    return this.http.get<any>(this.auxUrl + "api/Upload/GetFiles", this.httpOptions);
  }
}
