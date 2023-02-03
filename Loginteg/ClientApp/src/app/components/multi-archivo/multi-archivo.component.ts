import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MultiArchivoService } from '../../services/multiArchivo.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-multi-archivo',
  templateUrl: './multi-archivo.component.html',
  styleUrls: ['./multi-archivo.component.css']
})
export class MultiArchivoComponent implements OnInit {


  public nombreArchivo: string = "";
  @Output() public onUploadFinished = new EventEmitter();
  @Output() public rutaArchivo = new EventEmitter();


  baseUrl: string;

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  fileInfos?: Observable<any>;

  constructor(private uploadService: MultiArchivoService, private http: HttpClient) {
    //this.baseUrl = "http://localhost:5167/"

    this.baseUrl = environment.servidor + ':' + environment.puerto + '/';
  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFiles(event:any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }


//ksandoval
  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.nombreArchivo = file.name;
    const formData = new FormData();
    formData.append('file', file, file.name)
    console.log('fileToUpload.name', file.name);

    this.http.post(this.baseUrl + "api/Upload/UploadFiles", formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({

      next: (event: any) => {

        if (event.type === HttpEventType.UploadProgress && event.total != undefined) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          const msg = 'Subió el archivo con éxito: ' + file.name;
          this.message.push(msg);
          this.rutaArchivo.emit(this.nombreArchivo);
          this.fileInfos = this.uploadService.getFiles();
        }
      }, error: (err: any) => {
        this.progressInfos[idx].value = 0;
        const msg = 'No se pudo cargar el archivo: ' + file.name;
        this.message.push(msg);
        this.fileInfos = this.uploadService.getFiles();
      }
    }


    )
  }

}
