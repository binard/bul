import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Gallery } from './gallery/gallery';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, Gallery],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
