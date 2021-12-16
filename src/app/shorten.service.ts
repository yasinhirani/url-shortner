import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShortenService {

  constructor(private http: HttpClient) { }

  getShotenUrl(url: any){
    return this.http.get(`https://api.shrtco.de/v2/shorten?url=${url}`);
  }
}
