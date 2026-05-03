import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {}
