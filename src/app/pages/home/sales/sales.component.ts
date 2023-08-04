import { Component } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {
  images = [
    { src: 'assets/images/slider1.jpg', alt: 'Men Coat' },
    { src: 'assets/images/slider2.jpg', alt: 'Walking People' },
    { src: 'assets/images/slider3.jpg', alt: 'Two Men' }
  ];
}


