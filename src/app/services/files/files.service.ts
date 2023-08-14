import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs';
import { API_URL_UPLOADS } from 'src/app/constant';
import { File } from 'src/app/models/files.model';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private http: HttpClient
  ) { }

    get(name: string, url: string, type: string) {
      return this.http.get(url, { responseType: 'blob' })
        .pipe(
          tap(content => {
            const blob = new Blob([content], { type })
            saveAs(blob, name);
          }),
          map(() => true)
        )
    }

    upload(file: Blob) {
      const dto = new FormData();
      dto.append('file', file);
      return this.http.post<File>(API_URL_UPLOADS, dto);
    }
}
