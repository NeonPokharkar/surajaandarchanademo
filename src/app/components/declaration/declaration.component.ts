import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeddingService } from '../../services/wedding.service';

@Component({
  selector: 'app-declaration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css']
})
export class DeclarationComponent {
  wedding = inject(WeddingService);
}
