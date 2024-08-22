import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interface/product.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl = '../../assets/data.json';

  constructor(private http: HttpClient) {}

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataUrl);
  }
}
