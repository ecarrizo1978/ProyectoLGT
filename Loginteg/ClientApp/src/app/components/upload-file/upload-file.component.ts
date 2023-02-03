import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';

import { FileUploadService } from '../../services/upload-file.service';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class FileUploadComponent implements OnInit {
  public message: string ="";
  public progress: number = 0;
  public nombreArchivo: string = "";
  @Output() public onUploadFinished = new EventEmitter();
  @Output() public rutaArchivo = new EventEmitter();

  auxUrl!: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.JWT
    })
  }



  // Inject service 
  constructor(private http: HttpClient,  private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  public uploadFile = (files: any) => {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.JWT }  
    //this.auxUrl = "http://localhost:5167/"
    this.auxUrl = environment.servidor + ':' + environment.puerto + '/';

    if (files.length === 0) 
      return;

    let fileToUpload = <File>files[0];    
    this.nombreArchivo = fileToUpload.name
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name)
    console.log('fileToUpload.name', fileToUpload.name);

    return this.http.post(this.auxUrl + "api/Upload/Upload", formData, {
      reportProgress: true,
      observe: 'events',
      headers,
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress && event.total != undefined) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event.type === HttpEventType.Response ){
        this.message = 'Foto subida exitosamente.';
        //this.onUploadFinished.emit(event.body);
        this.rutaArchivo.emit(this.nombreArchivo);

      }
    })
  }

}
