import { Component, OnInit } from '@angular/core';
import { ShortenService } from '../shorten.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  urlArray: Array<any> = [];
  data: any;
  short_url: any;
  url_value: any;
  urls: any;

  constructor(private shorten: ShortenService) {
    if (localStorage.urlArray) {
      for (let i = 0; i < JSON.parse(localStorage.urlArray).length; i++) {
        this.urlArray.push(JSON.parse(localStorage.urlArray)[i]);
        
      }
    }
    else{
      return;
    }
   }

  ngOnInit(): void {
  }

  getUrl(url: any){
    this.shorten.getShotenUrl(url).subscribe((res) => {
      this.data = res;
      this.short_url = this.data.result.full_short_link;
      this.urlArray.push(
        {
          'original_link': this.data.result.original_link, 
          'shorten_link': this.data.result.full_short_link
        }
        );
      localStorage.setItem('urlArray', JSON.stringify(this.urlArray));
    });
    this.url_value = '';
  }

  copyUrl(element :any, e: any){
    const textBox = document.createElement('input');
    textBox.value = e;
    document.body.appendChild(textBox);
    textBox.focus();
    textBox.select();
    document.execCommand('copy');
    document.body.removeChild(textBox);
    element.textContent = "Copied";
    element.style.backgroundColor = "#3a3053";
  }

}
