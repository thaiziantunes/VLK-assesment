import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  readonly ROOT_URL;

  constructor(private Http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }

  get(url: string) {
    return this.Http.get(`${this.ROOT_URL}/${url}`);
  }

  getById(url: string, id: string) {
    return this.Http.get(`${this.ROOT_URL}/${url}/${id}`);
  }

  patch(url: string, payload: object) {
    return this.Http.patch(`${this.ROOT_URL}/${url}`, payload);
  }
}
