import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private Http: HttpClient) {}

  getData() {
    return this.Http.get('/api/getData');
  }
}
