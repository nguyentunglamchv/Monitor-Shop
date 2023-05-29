import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = 'http://localhost:8989/api/categories';

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(this.url);
  }
}
