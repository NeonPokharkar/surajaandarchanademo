import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeddingService } from '../../services/wedding.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  wedding = inject(WeddingService);
}
