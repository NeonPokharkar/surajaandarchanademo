import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeddingService } from '../../services/wedding.service';

@Component({
  selector: 'app-floating-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-actions.component.html',
  styleUrls: ['./floating-actions.component.css']
})
export class FloatingActionsComponent {
  wedding = inject(WeddingService);
}
