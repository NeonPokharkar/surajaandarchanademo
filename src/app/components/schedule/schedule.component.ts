import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeddingService } from '../../services/wedding.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  wedding = inject(WeddingService);
}
